<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p class="enter-text">Вход</p>

      <div class="card flex justify-center input-container">
        <FloatLabel>
          <InputText
              id="username-input"
              v-model="computedUsername"
              @focus="onFocus('username')"
              @blur="onBlur('username')"
          />
          <label :class="{ active: computedUsername || focusedField === 'username' }" class="label-text"
                 for="username">Логин</label>
        </FloatLabel>
      </div>

      <div class="card flex justify-center password">
        <FloatLabel>
          <Password
              class="custom-password"
              id="password"
              :inputStyle="{ width: '100%' }"
              v-model="computedPassword"
              toggleMask
              @focus="onFocus('password')"
              @blur="onBlur('password')"
          >
            <template #header>
              <div class="font-semibold text-xm mb-4">Введите пароль</div>
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
          <label :class="{ active: computedPassword || focusedField === 'password' }" class="password-text" for="password">Пароль</label>
        </FloatLabel>
      </div>
      <Button class="submit" label="Войти" size="small" raised :loading="loading" @click="loginUser"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import axios from 'axios';

export default {
  name: 'LoginModal',
  components: {
    FloatLabel,
    InputText,
    Password,
    Divider,
    Button
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(['username', 'password', 'focusedField', 'loading']),
    computedUsername: {
      get() {
        return this.username;
      },
      set(value) {
        this.updateUsername(value);
      }
    },
    computedPassword: {
      get() {
        return this.password;
      },
      set(value) {
        this.updatePassword(value);
      }
    }
  },
  methods: {
    ...mapActions(['updateUsername', 'updatePassword', 'updateFocusedField', 'updateAuthenticationStatus']),
    closeModal() {
      this.updateUsername('');
      this.updatePassword('');
      this.updateFocusedField(null);
      this.$emit('close');
    },
    onFocus(field) {
      this.updateFocusedField(field);
    },
    onBlur(field) {
      if (this[field] === '') {
        this.updateFocusedField(null);
      }
    },
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.computedUsername,
          password: this.computedPassword
        });
        console.log('Login response:', response.data);
        this.updateAuthenticationStatus(true);
        this.closeModal();
        this.isAuthenticated = true;
        this.$emit('loginSuccess');
      } catch (error) {
        console.error('Login error:', error);
        alert('Неверный логин или пароль');
      }
    }
  }
};
</script>


<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  position: relative;
  gap: 20px
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 20px;
}

#username-input {
  width: 100%;
  font-size: 1.2rem;
}

.label-text, .password-text {
  font-size: 1.2rem;
  position: absolute;
  pointer-events: none;
  transition: 0.2s ease all;
  transform-origin: left top;
}

.input-container, .password {
  margin-bottom: 1.4rem;
}

.label-text.active,
.password-text.active {
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
  width: 10rem;
  font-size: 1.3rem;
}

</style>