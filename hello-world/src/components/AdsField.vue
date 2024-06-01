<template>
  <div>
    <!-- DataView компонент -->
    <div class="card">
      <DataView :value="ads" :layout="layout" paginator :rows="5">
        <template #header>
          <div class="flex justify-content-end">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </template>
        <template #list="slotProps">
          <div class="grid-list">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
              <div class="list-item flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                <div class="md:w-10rem relative">
                  <img class="block xl:block mx-auto border-round w-full" :src="getImageUrl(item.image)" :alt="item.title"/>
                </div>
                <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                  <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                    <div>
                      <span class="font-medium text-secondary text-sm">{{ item.location }}</span>
                      <div class="text-lg font-medium text-900 mt-2">{{ item.title }}</div>
                    </div>
                    <div class="surface-100 p-1" style="border-radius: 30px">
                      <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                        <span class="text-900 font-medium text-sm">{{ item.category }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column md:align-items-end gap-5">
                    <span class="text-xl font-semibold text-900">{{ item.price }} Br</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button icon="pi pi-shopping-cart" label="Купить" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial white-space-nowrap"></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #grid="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 xl:col-4 p-2">
              <div class="grid-item p-4 border-1 surface-border surface-card border-round flex flex-column">
                <div class="surface-50 flex justify-content-center border-round p-3">
                  <div class="relative mx-auto">
                    <img class="block xl:block mx-auto border-round w-full" :src="getImageUrl(item.image)" :alt="item.title"/>
                  </div>
                </div>
                <div class="pt-4">
                  <div class="flex flex-row justify-content-between align-items-start gap-2">
                    <div>
                      <span class="font-medium text-secondary text-sm">{{ item.location }}</span>
                      <div class="text-lg font-medium text-900 mt-1">{{ item.title }}</div>
                    </div>
                    <div class="surface-100 p-1" style="border-radius: 30px">
                      <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                        <span class="text-900 font-medium text-sm">{{ item.category }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column gap-4 mt-4">
                    <span class="text-2xl font-semibold text-900">{{ item.price }} Br</span>
                    <div class="flex gap-2">
                      <Button icon="pi pi-shopping-cart" label="Купить" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto white-space-nowrap"></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Button from 'primevue/button';

export default {
  name: "AdsField",
  components: {
    DataView,
    DataViewLayoutOptions,
    Button
  },
  data() {
    return {
      ads: [], // Загружаемые данные
      layout: 'list' // Начальное значение для layout
    };
  },
  methods: {
    getImageUrl(image) {
      // Используем require для динамического импорта изображения
      return require(`@/assets/jpg/${image}`);
    }
  },
  mounted() {
    axios.get('/ad-data.json')
        .then(response => {
          this.ads = response.data;
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
