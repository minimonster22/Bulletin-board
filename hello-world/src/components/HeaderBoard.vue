<template>
  <div class="header">
    <i class="pi pi-warehouse" style="font-size: 2rem"></i>
    <div class="name">Доска объявлений</div>
    <div class="icon-login" @click="toggleMenu">
      <i class="pi pi-user" style="font-size: 2rem"></i>
      <div v-if="showMenu" class="card flex justify-center menu-container">
        <AppMenu v-if="isAuthenticated" :model="authItems" />
        <AppMenu v-else :model="guestItems" />
      </div>
    </div>
    <LoginModal :isVisible="isModalVisible" @close="isModalVisible = false" />
  </div>
</template>

<script>


import LoginModal from './LoginModal.vue';

export default {
  name: 'HeaderBoard',
  components: {
    LoginModal,
  },
  data() {
    return {
      showMenu: false,
      isAuthenticated: false,
      isModalVisible: true,
      authItems: [
        {
          label: 'Profile',
          items: [
            {
              label: 'Настройки',
              icon: 'pi pi-cog'
            },
            {
              label: 'Выйти',
              icon: 'pi pi-sign-out'
            }
          ]
        },
        {
          label: 'Documents',
          items: [
            {
              label: 'New',
              icon: 'pi pi-plus'
            },
            {
              label: 'Search',
              icon: 'pi pi-search'
            }
          ]
        }
      ],
      guestItems: [
        {
          label: 'Войти',
          icon: 'pi pi-sign-in',
          command: () => { this.isModalVisible = true; }
        },
        {
          label: 'Зарегистрироваться',
          icon: 'pi pi-user-plus'
        }
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
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

/* Добавьте дополнительные стили по необходимости */
</style>
