<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p class="enter-text">Вход</p>

      <div class="card flex justify-center username">
        <FloatLabel>
          <InputText
              id="username-input"
              v-model="username"
              @focus="onFocus('username')"
              @blur="onBlur('username')"
          />
          <label :class="{ active: username || focusedField === 'username' }" class="username-text" for="username">Логин</label>
        </FloatLabel>
      </div>

      <div class="card flex justify-center password">
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
              <div class="font-semibold text-xm mb-4">Введите пароль</div>
            </template>
            <template #footer>
              <Divider />
              <ul class="pl-2 ml-2 my-0 leading-normal">
                <li>Не менее одной строчной буквы</li>
                <li>Не менее одной заглавной буквы</li>
                <li>Не менее одного числа</li>
                <li>Минимум 8 символов</li>
              </ul>
            </template>
          </Password>
          <label :class="{ active: password || focusedField === 'password' }" class="password-text" for="password">Пароль</label>

        </FloatLabel>
      </div>
      <Button class="submit" label="Войти" size="small" raised :loading="loading" @click="load" />

    </div>
  </div>
</template>


<script>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';

import Button from 'primevue/button';


export default {
  name: 'LoginModal',
  components: {
    FloatLabel,
    InputText,
    Password,
    Button
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
      focusedField: null,
      loading: false
    };
  },
  methods: {
    closeModal() {
      this.username = '';
      this.password = '';
      this.focusedField = null;
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
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
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
  gap:20px
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

.username-text, .password-text {
  font-size: 1.2rem;
  position: absolute;
  pointer-events: none;
  transition: 0.2s ease all;
  transform-origin: left top;
}
.username, .password {
  margin-bottom:1.4rem;
}


.username-text.active,
.password-text.active {
  transform: scale(0.9) translateY(-1px);
}

.enter-text {
  margin: 20px
}

.p-float-label {
  display:flex;
  width: 100%;
}

.submit {
  height: 3rem;
  width: 10rem;
  font-size:1.3rem;
}

</style>