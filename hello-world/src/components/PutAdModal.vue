<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p class="enter-text">Подать объявление</p>
      <form @submit.prevent="submitAd">
        <div>
          <label for="title">Заголовок</label>
          <input v-model="newAd.title" id="title" type="text" required />
        </div>
        <div>
          <label for="price">Цена</label>
          <input v-model="newAd.price" id="price" type="number" required />
        </div>
        <div>
          <label for="category">Категория</label>
          <input v-model="newAd.category" id="category" type="text" required />
        </div>
        <div>
          <label for="location">Местоположение</label>
          <input v-model="newAd.location" id="location" type="text" required />
        </div>
        <div class="card flex justify-center">
          <FileUpload mode="basic" name="demo" url="http://localhost:3000/api/upload" accept="image/*" :maxFileSize="1000000"
                      @upload="onUpload" :auto="true" chooseLabel="Browse" />
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PutAdModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newAd: {
        title: '',
        price: '',
        category: '',
        location: '',
        date_posted: new Date().toISOString().split('T')[0],
        image: ''
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onUpload(event) {
      this.newAd.image = event.xhr.response;
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    async submitAd() {
      try {
        await axios.post('http://localhost:3000/api/ads', this.newAd);
        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Ad Submitted', life: 3000 });
        this.closeModal();
      } catch (error) {
        console.error('Error submitting ad:', error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit ad', life: 3000 });
      }
    }
  }
}
</script>

<style scoped>
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  position: relative;
}
</style>
