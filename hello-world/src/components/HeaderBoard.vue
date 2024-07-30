<template>
  <div class="header">
    <i class="pi pi-warehouse" style="font-size: 2rem" @click="goToHome"></i>
    <div class="name">Доска объявлений</div>
    <div class="icon-login" @click="toggleMenu">
      <i class="pi pi-user" style="font-size: 2rem"></i>
      <div v-if="showMenu" class="card flex justify-center menu-container">
        <AppMenu v-if="isAuthenticated" :model="authItems" />
        <AppMenu v-else :model="guestItems" />
      </div>
    </div>
    <LoginModal :isVisible="isModalLoginVisible" @close="isModalLoginVisible = false" />
    <RegisterModal :isVisible="isModalRegisterVisible" @close="isModalRegisterVisible = false" @registrationSuccess="handleRegistrationSuccess" />

  </div>
</template>

<script>

import LoginModal from './LoginModal.vue';
import RegisterModal from './RegisterModal.vue';
import axios from 'axios';

export default {
  name: 'HeaderBoard',
  components: {
    LoginModal,
    RegisterModal,
  },
  data() {
    return {
      showMenu: false,
      isAuthenticated: false,
      isModalRegisterVisible: false,
      isModalLoginVisible: false,
      authItems: [
        {
          label: 'Profile',
          items: [
            {
              label: 'Личный кабинет',
              icon: 'pi pi-cog',
              command: this.goToUserProfile // Не используется в data()
            },
            {
              label: 'Выйти',
              icon: 'pi pi-sign-out',
              command: this.logout
            }
          ]
        },
      ],
      guestItems: [
        {
          label: 'Войти',
          icon: 'pi pi-sign-in',
          command: () => { this.isModalLoginVisible = true; }
        },
        {
          label: 'Зарегистрироваться',
          icon: 'pi pi-user-plus',
          command: () => { this.isModalRegisterVisible = true; }
        }
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    goToUserProfile() {
      this.$router.push('/user-profile');
    },
    goToHome() {
      this.$router.push('/');
    },
    handleRegistrationSuccess() {
      this.isAuthenticated = true;
    },
    async checkAuth() {
      try {
        const response = await axios.get('http://localhost:3000/check-auth');
        console.log('Auth response:', JSON.stringify(response.data, null, 2));
        this.isAuthenticated = response.data.isAuthenticated;
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    },
    logout() {
      this.isAuthenticated = false;
      axios.post('http://localhost:3000/logout');
    }
  },
  mounted() {
    this.checkAuth();
  }
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7vh;
  background-color: var(--primary-color);
  padding-left: 70px;
  padding-right: 25px;
  font-family: Mulish,sans-serif;
  font-size: 2vw;
}

.icon-login {
  cursor: pointer;
  position: relative;
}

.menu-container {
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
}

.pi-warehouse {
  cursor:pointer;
}
</style>
