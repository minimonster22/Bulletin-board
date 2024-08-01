<template>
  <HeaderBoard/>
  <div>
    <h1 v-if="ad">{{ ad.title }}</h1>
    <img v-if="ad" :src="getImageUrl(ad.image)" :alt="ad.title" class="detail-image"/>
    <div v-if="ad" v-html="ad.description"></div>
    <div v-if="ad">{{ ad.price }} Br</div>
    <div v-if="ad">{{ ad.user }}</div>
    <Button v-if="isCurrentUserAdOwner" @click="showEditModal = true">Редактировать</Button>

    <Dialog v-if="isCurrentUserAdOwner" :visible="showEditModal" modal @hide="cancelEdit">
      <form @submit.prevent="submitEdit">
        <div class="input-edit">
          <label for="field">Поле для редактирования</label>
          <select v-model="editField" id="field" required>
            <option value="title">Название</option>
            <option value="price">Цена</option>
            <option value="category">Категория</option>
            <option value="location">Местоположение</option>
            <option value="description">Описание</option>
          </select>
        </div>
        <div class="input-edit" v-if="editField">
          <label :for="editField">{{ getFieldLabel(editField) }}</label>
          <component :is="getComponentForField(editField)" v-model="editAdData[editField]" :id="editField" :required="isFieldRequired(editField)" :editorStyle="editField === 'description' ? 'height: 320px; width: 320px' : ''" />
        </div>
        <Button type="submit">Сохранить</Button>
        <Button type="button" @click="cancelEdit">Отмена</Button>
      </form>
    </Dialog>
  </div>
</template>

<script>
import HeaderBoard from "@/components/HeaderBoard.vue";
import adsData from '/public/ad-data.json';
import axios from 'axios';
import Editor from "primevue/editor";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';

export default {
  data() {
    return {
      ad: null,
      ads: adsData,
      currentUser: null,
      showEditModal: false,
      editField: null,
      editAdData: {}
    };
  },
  components: {
    HeaderBoard,
    Editor,
    Button,
    InputText,
    InputNumber,
    Dialog
  },
  props: ['id'],
  computed: {
    isCurrentUserAdOwner() {
      return this.ad && this.currentUser && this.ad.user === this.currentUser.username;
    }
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/jpg/${image}`);
    },
    fetchAdDetails() {
      const adId = parseInt(this.id, 10);
      this.ad = this.ads.find(ad => ad.id === adId);
    },
    fetchCurrentUser() {
      axios.get('http://localhost:3000/api/user-info')
          .then(response => {
            this.currentUser = response.data;
          })
          .catch(error => {
            console.error('Ошибка при загрузке информации о пользователе:', error);
          });
    },
    getFieldLabel(field) {
      const labels = {
        title: 'Название',
        price: 'Цена',
        category: 'Категория',
        location: 'Местоположение',
        description: 'Описание'
      };
      return labels[field];
    },
    getComponentForField(field) {
      const components = {
        title: 'InputText',
        price: 'InputNumber',
        category: 'InputText',
        location: 'InputText',
        description: 'Editor'
      };
      return components[field];
    },
    isFieldRequired(field) {
      return ['title', 'price', 'category', 'location'].includes(field);
    },
    editAd() {
      this.showEditModal = true;
      this.editAdData = { ...this.ad };
    },
    cancelEdit() {
      this.showEditModal = false;
      this.editField = null;
      this.editAdData = {};
    },
    submitEdit() {
      if (!this.editField) {
        return;
      }
      const updateData = {
        [this.editField]: this.editAdData[this.editField]
      };
      axios.put(`http://localhost:3000/api/ads/${this.ad.id}`, updateData)
          .then(response => {
            this.ad = { ...this.ad, ...response.data };
            this.showEditModal = false;
          })
          .catch(error => {
            console.error('Ошибка при обновлении объявления:', error);
          });
    }
  },
  created() {
    this.fetchAdDetails();
    this.fetchCurrentUser();
  }
};
</script>

<style scoped>
.detail-image {
  width: 30vh;
}

.input-edit {
  margin-bottom: 1em;
}

.p-editor-container, .p-editor-toolbar {
  width: 320px !important;
}
</style>
