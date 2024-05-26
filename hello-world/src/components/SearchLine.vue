<template>
  <div class="search-container">
    <InputText v-model="searchQuery" placeholder="Поиск..." />
    <Button icon="pi pi-search" @click="performSearch" />
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  name: 'SearchLine',
  components: {
    InputText,
    Button
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    performSearch() {
      console.log(`Поиск: ${this.searchQuery}`);
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5vh;
  margin-left: 10vw;
  margin-right: 10vw;
}

.search-container .p-inputtext {
  width: 80vw;
  margin-right: 10px;
}

</style>