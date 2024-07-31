<template>
  <div>
    <!-- DataView компонент -->
    <div class="card">
      <div class="flex justify-content-end sort">
        <DataViewLayoutOptions v-model="layout"/>
        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Сортировать"
                  @change="onSortChange"/>
      </div>

      <DataView v-if="layout === 'grid'" :value="ads" layout="grid" paginator :rows="5" :sortOrder="sortOrder"
                :sortField="sortField">
        <template #grid="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 xl:col-4 p-2">
              <div class="grid-item p-4 border-1 surface-border surface-card border-round flex flex-column">
                <div class="surface-50 flex justify-content-center border-round p-3">
                  <div class="relative mx-auto">
                    <img class="block xl:block mx-auto border-round w-full" :src="getImageUrl(item.image)"
                         :alt="item.title"/>
                  </div>
                </div>
                <div class="pt-4">
                  <div class="flex flex-row justify-content-between align-items-start gap-2">
                    <div>
                      <span class="font-medium text-secondary text-sm">{{ item.location }}</span>
                      <router-link :to="`/ad/${item.id}`" class="text-lg font-medium text-900 mt-1">
                        {{ item.title }} (ID: {{ item.id }})
                      </router-link>
                    </div>
                    <div class="surface-100 p-1" style="border-radius: 30px">
                      <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                           style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                        <span class="text-900 font-medium text-sm">{{ item.category }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column gap-4 mt-4">
                    <span class="text-2xl font-semibold text-900">{{ item.price }} Br</span>
                    <div class="flex gap-2">
                      <Button icon="pi pi-shopping-cart" label="Купить"
                              :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                              class="flex-auto white-space-nowrap"></Button>
                    </div>
                  </div>
                  <div class="text-lg font-medium text-900 mt-1">{{ item.date_posted }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>

      <DataTable v-if="layout === 'list'" v-model:filters="filters" filterDisplay="row" :value="ads" paginator
                 :rows="10" :sortOrder="sortOrder" :sortField="sortField"
                 :globalFilterFields="['title', 'location', 'category', 'date_posted']">
        <Column field="image" header=" ">
          <template #body="slotProps">
            <img :src="getImageUrl(slotProps.data.image)" :alt="slotProps.data.title" width="50"/>
          </template>
        </Column>
        <Column field="title" header="Название" :showFilterMenu="false">
          <template #body="slotProps">
            <router-link :to="`/ad/${slotProps.data.id}`">{{ slotProps.data.title }}</router-link>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Искать по названию"/>
          </template>
        </Column>
        <Column field="location" header="Место" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Искать по городу"/>
          </template>
        </Column>
        <Column field="category" header="Категория" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.category }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="categoryOptions"
                      optionLabel="label" optionValue="value" placeholder="Искать по категории"/>
          </template>
        </Column>
        <Column field="price" header="Цена">
          <template #body="{ data }">
            <span>{{ data.price }} Br</span>
          </template>
        </Column>
        <Column header=" ">
          <template #body>
            <Button icon="pi pi-shopping-cart" label="Купить"/>
          </template>
        </Column>
        <Column field="date_posted" header="Дата размещения">
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import {FilterMatchMode} from 'primevue/api';

export default {
  name: "AdsField",
  components: {
    DataView,
    DataViewLayoutOptions,
    Dropdown,
    Button,
    DataTable,
    Column,
    InputText,
  },
  data() {
    return {
      ads: [],
      layout: 'list',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      minPrice: null,
      maxPrice: null,
      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        title: {value: null, matchMode: FilterMatchMode.CONTAINS},
        location: {value: null, matchMode: FilterMatchMode.CONTAINS},
        category: {value: null, matchMode: FilterMatchMode.CONTAINS},
        price: {value: null, matchMode: FilterMatchMode.EQUALS},
        date_posted: {value: null, matchMode: FilterMatchMode.EQUALS},
      },
      categoryOptions: [],
      sortOptions: [
        {label: 'Сначала дорогие', value: '!price'},
        {label: 'Сначала дешевые', value: 'price'},
        {label: 'Сначала новые', value: 'date_posted'},
        {label: 'Сначала старые', value: '!date_posted'}
      ]
    };
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/jpg/${image}`);
    },
    fetchCategoryOptions() {
      const categories = [...new Set(this.ads.map(ad => ad.category))];
      this.categoryOptions = categories.map(category => ({label: category, value: category}));
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    }
  },
  mounted() {
    axios.get('/ad-data.json')
        .then(response => {
          this.ads = response.data;
          this.fetchCategoryOptions();
        })
        .catch(error => {
          console.error("Ошибка при загрузке данных: ", error);
        });
  },
};
</script>

<style scoped>
.grid-list {
  display: flex;
  flex-direction: column;
}

.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.ad-item h3 {
  margin: 0;
  font-size: 1.2rem;
}

.ad-item p {
  margin: 0.2rem 0;
}

.block {
  width: 250px;
}

</style>
