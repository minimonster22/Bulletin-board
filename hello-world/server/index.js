const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const db = new sqlite3.Database('users.db');

const pathToUploads = path.resolve(__dirname, '../src/uploads/');
if (!fs.existsSync(pathToUploads)) {
    fs.mkdirSync(pathToUploads, { recursive: true });
}

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: 'Lax',
        maxAge: 1000 * 60 * 60
    }
}));

app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        name TEXT,
        city TEXT,
        phone TEXT
    )`);
});

app.post('/register', async (req, res) => {
    const { username, password, name, city, phone } = req.body;

    if (!username || !password || !name || !city || !phone) {
        return res.status(400).send('All fields are required');
    }

    try {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Server error');
            }
            if (row) {
                return res.status(400).send('Username already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            db.run(`INSERT INTO users (username, password, name, city, phone) VALUES (?, ?, ?, ?, ?)`,
                [username, hashedPassword, name, city, phone], function(err) {
                    if (err) {
                        console.error('Insert error:', err);
                        return res.status(500).send('Server error');
                    }
                    req.session.isAuthenticated = true;
                    console.log('Session after registration:', req.session);
                    res.status(201).send('User registered');
                });
        });
    } catch (err) {
        console.error('Catch error:', err);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Логин и пароль обязательны');
    }

    try {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Ошибка сервера');
            }
            if (!row) {
                return res.status(401).send('Неверный логин или пароль');
            }

            const match = await bcrypt.compare(password, row.password);
            if (!match) {
                return res.status(401).send('Неверный логин или пароль');
            }

            req.session.isAuthenticated = true;
            req.session.user = { username: row.username };
            console.log('Session after login:', req.session);
            res.status(200).send('Успешно вошли');
        });
    } catch (err) {
        console.error('Catch error:', err);
        res.status(500).send('Ошибка сервера');
    }
});

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get('/check-auth', (req, res) => {
    console.log(req.session);
    res.json({ isAuthenticated: !!req.session.isAuthenticated });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        } else {
            res.status(200).send('Logged out.');
        }
    });
});

app.get('/api/user-info', (req, res) => {
    if (req.session && req.session.isAuthenticated && req.session.user) {
        db.get(`SELECT username, name, city, phone FROM users WHERE username = ?`, [req.session.user.username], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Server error');
            }
            if (row) {
                res.json({
                    username: row.username,
                    name: row.name,
                    city: row.city,
                    phone: row.phone
                });
            } else {
                res.status(401).json({ message: 'User not found' });
            }
        });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

app.post('/api/update-user-info', (req, res) => {
    const { name, city, phone } = req.body;

    if (!req.session || !req.session.isAuthenticated || !req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    db.run(
        `UPDATE users SET name = ?, city = ?, phone = ? WHERE username = ?`,
        [name, city, phone, req.session.user.username],
        function (err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Server error');
            }

            res.status(200).json({ message: 'User info updated' });
        }
    );
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathToUploads);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('demo'), (req, res) => {
    if (!req.file) {
        console.log('No file uploaded.');
        return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded successfully:', req.file);
    res.status(200).send('File uploaded successfully.');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
