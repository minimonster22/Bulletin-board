<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p class="enter-text">Подать объявление</p>
      <form @submit.prevent="submitAd">
        <div class="input-ad">
          <label for="title">Название товара или услуги</label>
          <InputText v-model="newAd.title" id="title" type="text" required />
        </div>
        <div class="input-ad">
          <label for="price">Цена</label>
          <InputNumber v-model="newAd.price" id="price" inputId="integeronly" fluid  />
        </div>
        <div class="input-ad">
          <label for="category">Категория</label>
          <Dropdown v-model="newAd.category" :options="categoryOptions" optionLabel="label" optionValue="value" placeholder="Выберите категорию" required />
        </div>
        <div class="input-ad">
          <label for="location">Местоположение</label>
          <InputText v-model="newAd.location" id="location" type="text" required />
        </div>
        <Editor v-model="newAd.description" editorStyle="height: 320px" />
        <div class="card flex justify-center upload-file">
          <FileUpload mode="basic" name="demo" url="http://localhost:3000/api/upload" accept="image/*" :maxFileSize="1000000"
                      @upload="onUpload" :auto="true" chooseLabel="Browse" />
        </div>

        <Button type="submit">Отправить</Button>
      </form>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import axios from 'axios';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Editor from "primevue/editor";
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';

export default {
  name: "PutAdModal",
  components: {
    Button,
    InputText,
    InputNumber,
    Editor,
    FileUpload,
    Dropdown
  },
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
        image: '',
        description: ''
      },
      categoryOptions: []
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
    },
    fetchCategoryOptions() {
      axios.get('/ad-data.json')
          .then(response => {
            const ads = response.data;
            const categories = [...new Set(ads.map(ad => ad.category))];
            this.categoryOptions = categories.map(category => ({
              label: category,
              value: category
            }));
          })
          .catch(error => {
            console.error('Ошибка при загрузке категорий:', error);
          });
    }
  },
  mounted() {
    this.fetchCategoryOptions();
  }
}
</script>

<style scoped>
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: max-content;
  text-align: center;
  position: relative;
}

.upload-file {
  margin: 10px;
}


label {
  margin-right: 1vw;
  align-content:center;
}
.enter-text {
  font-weight: bold;
  font-size:1.2rem;
}

.input-ad {
  display:flex;
  justify-content: space-between;
  margin-bottom: 1vh;
}


</style>
