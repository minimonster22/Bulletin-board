<template>
  <div>
    <HeaderBoard></HeaderBoard>
    <div class="container-userinfo">
      <div class="text-userinfo" v-if="!editingCity" @click="editingCity = true">
        {{ userInfo.city || 'Click to edit city' }}
        <i class="pi pi-pencil"></i>
      </div>
      <div v-else>
        <InputText v-model="userInfo.city" placeholder="City" @blur="saveEdit" @keyup.enter="saveEdit" />
      </div>

      <div class="text-userinfo" v-if="!editingPhone" @click="editingPhone = true">
        {{ userInfo.phone || 'Click to edit phone' }}
        <i class="pi pi-pencil"></i>
      </div>
      <div v-else>
        <InputText v-model="userInfo.phone" placeholder="Phone" @blur="saveEdit" @keyup.enter="saveEdit" />
      </div>

      <div class="text-userinfo" v-if="!editingName" @click="editingName = true">
        {{ userInfo.name || 'Click to edit name' }}
        <i class="pi pi-pencil"></i>
      </div>
      <div v-else>
        <InputText v-model="userInfo.name" placeholder="Name" @blur="saveEdit" @keyup.enter="saveEdit" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderBoard from "@/components/HeaderBoard.vue";
import InputText from 'primevue/inputtext';

export default {
  name: 'UserProfile',
  components: {
    HeaderBoard,
    InputText,
  },
  data() {
    return {
      userInfo: {
        username: '',
        name: '',  // Добавляем имя
        city: '',
        phone: ''
      },
      editingCity: false,
      editingPhone: false,
      editingName: false
    };
  },
  methods: {
    async saveEdit() {
      this.editingCity = false;
      this.editingPhone = false;
      this.editingName = false;

      try {
        const response = await axios.post('http://localhost:3000/api/update-user-info', {
          name: this.userInfo.name,
          city: this.userInfo.city,
          phone: this.userInfo.phone
        });
        console.log('User info updated:', response.data);
      } catch (error) {
        console.error('Error saving user info:', error);
      }
    },
    async fetchUserInfo() {
      try {
        const response = await axios.get('http://localhost:3000/api/user-info');
        if (response.data) {
          this.userInfo = response.data;
          console.log('Fetched user info:', this.userInfo);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  },
  mounted() {
    this.fetchUserInfo();
  }
}
</script>

<style scoped>
.container-userinfo {
  border: 1px solid var(--primary-color);
  width:max-content;
  margin: 20px auto;
  padding: 20px;
}

.text-userinfo {
  font-size: 1.5rem;
}
</style>
