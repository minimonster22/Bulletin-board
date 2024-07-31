<template>
  <div class="container-putad">
  <Button class="submit" label="Подать объявление" size="medium" @click="handleButtonClick" />
    <LoginModal :isVisible="isModalLoginVisible" @close="isModalLoginVisible = false" @loginSuccess="handleLoginSuccess"/>
    <RegisterModal :isVisible="isModalRegisterVisible" @close="isModalRegisterVisible = false" @registrationSuccess="handleRegistrationSuccess" />
    <PutAdModal :isVisible="isModalPutAdVisible" @close="isModalPutAdVisible = false"  />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Button from 'primevue/button';
import RegisterModal from "@/components/RegisterModal.vue";
import LoginModal from "@/components/LoginModal.vue";
import PutAdModal from "@/components/PutAdModal.vue";


export default {
  name: "PutAdBtn",
  components: {
    LoginModal,
    Button,
    RegisterModal,
    PutAdModal
  },
  data() {
    return {
      isModalLoginVisible: false,
      isModalRegisterVisible: false,
      isModalPutAdVisible: false
    };
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods:  {
    ...mapActions(['checkAuth']),
    handleButtonClick() {
      if (this.isAuthenticated) {
        this.addAd();
      } else {
        this.isModalLoginVisible = true;
      }
    },
    addAd() {
      this.isModalPutAdVisible = true;
    },
    handleLoginSuccess() {
      this.isModalLoginVisible = false;
      this.checkAuth();
    },
    handleRegistrationSuccess() {
      this.isModalRegisterVisible = false;
      this.checkAuth();
    }
  },

  mounted() {
    this.checkAuth();
  }
}
</script>



<style scoped>
.container-putad {
  width: 100%;
  margin: 20px auto 0;
  display: flex;
  justify-content: center;
}
</style>