<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p class="enter-text">Регистрация</p>

      <div class="card flex justify-center input-container">
        <FloatLabel>
          <InputText
              id="username"
              class="input"
              v-model="username"
              @focus="onFocus('username')"
              @blur="onBlur('username')"
          />
          <label :class="{ active: username || focusedField === 'username' }" class="label-text"
                 for="username">Логин</label>
        </FloatLabel>
      </div>

      <div class="card flex justify-center input-container">
        <FloatLabel>
          <Password
              class="custom-password"
              id="password"
              :inputStyle="{ width: '100%' }"
              v-model="password"
              toggleMask
              @focus="onFocus('password')"
              @blur="onBlur('password')"
          >
            <template #header>
              <div class="font-semibold text-xm mb-4">Придумайте пароль</div>
            </template>
            <template #footer>
              <Divider/>
              <ul class="pl-2 ml-2 my-0 leading-normal">
                <li>Не менее одной строчной буквы</li>
                <li>Не менее одной заглавной буквы</li>
                <li>Не менее одного числа</li>
                <li>Минимум 8 символов</li>
              </ul>
            </template>
          </Password>
          <label :class="{ active: password || focusedField === 'password' }" class="label-text" for="password">Пароль</label>

        </FloatLabel>
      </div>
      <div class="card flex justify-center input-container">
        <FloatLabel>
          <InputText
              id="name"
              class="input"
              v-model="name"
              @focus="onFocus('name')"
              @blur="onBlur('name')"
          />
          <label :class="{ active: name || focusedField === 'name' }" class="label-text"
                 for="name">Имя</label>
        </FloatLabel>
      </div>
      <div class="card flex justify-center input-container">
        <FloatLabel>
          <InputText
              id="city"
              class="input"
              v-model="city"
              @focus="onFocus('city')"
              @blur="onBlur('city')"
          />
          <label :class="{ active: city || focusedField === 'city' }" class="label-text"
                 for="city">Город</label>
        </FloatLabel>
      </div>
      <div class="card flex justify-center input-container">
        <FloatLabel>
          <InputMask
              id="phone"
              class="input"
              v-model="phone"
              @focus="onFocus('phone')"
              @blur="onBlur('phone')"
              mask="+375 (99) 999-99-99"
              placeholder="+375 (99) 999-99-99"
          />
          <label
              :class="{ active: phone || focusedField === 'phone' }"
              class="label-text"
              for="phone"
          >
            Телефон
          </label>
        </FloatLabel>
      </div>
      <Button class="submit" label="Зарегистрироваться" size="small" raised :loading="loading" @click="registerUser"/>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>


<script>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import axios from 'axios';


export default {
  name: 'RegisterModal',
  components: {
    FloatLabel,
    InputText,
    Password,
    Button,
    InputMask,
    Divider,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      username: '',
      password: '',
      name: '',
      city: '',
      phone: '',
      focusedField: null,
      loading: false,
      message: '',
      isAuthenticated: false,
    };
  },
  methods: {
    closeModal() {
      this.username = '';
      this.password = '';
      this.name = '';
      this.city = '';
      this.phone = '';
      this.focusedField = null;
      this.message = '';
      this.$emit('close');
    },
    onFocus(field) {
      this.focusedField = field;
    },
    onBlur(field) {
      if (this[field] === '') {
        this.focusedField = null;
      }
    },
    async registerUser() {
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password,
          name: this.name,
          city: this.city,
          phone: this.phone
        });
        this.message = response.data;
        this.closeModal();
        this.isAuthenticated = true;
        this.$emit('registrationSuccess');
        alert('Регистрация прошла успешно');
      } catch (error) {
        if (error.response) {
          this.message = `Error: ${error.response.data}`;
          alert(`Ошибка: ${error.response.data}`);
        } else if (error.request) {
          this.message = 'No response received from server';
          alert('Нет ответа от сервера');
        } else {
          this.message = `Error: ${error.message}`;
          alert(`Ошибка: ${error.message}`);
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  gap: 20px
}



.input {
  width: 100%;
  font-size: 1.2rem;
}

.label-text {
  font-size: 1.2rem;
  position: absolute;
  pointer-events: none;
  transition: 0.2s ease all;
  transform-origin: left top;
}

.input-container {
  margin-bottom: 1.4rem;
}

#password {
  width: 100%;
}

.label-text.active {
  transform: scale(0.9) translateY(-1px);
}

.enter-text {
  margin: 20px
}

.p-float-label {
  display: flex;
  width: 100%;
}

.submit {
  height: 3rem;
  width: 15rem;
  font-size: 1.3rem;
}

</style>