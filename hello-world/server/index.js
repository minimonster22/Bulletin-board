const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

const app = express();
const db = new sqlite3.Database('users.db');

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: 'Lax', // ПОМОГЛО ЧТОБЫ ВЕРНО ПЕРЕДАВАЛСЯ isAuthenticated
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

app.post('/test', (req, res) => {
    req.session.isAuthenticated = true;
    console.log('Session created:', req.session);

    // Добавляем заголовок Set-Cookie вручную
    res.setHeader('Set-Cookie', `connect.sid=${req.sessionID}; HttpOnly; Path=/; SameSite=None;`);

    res.send('Session set');
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
