<template>
  <HeaderBoard/>
  <div>
    <h1 v-if="ad">{{ ad.title }}</h1>
    <img v-if="ad" :src="getImageUrl(ad.image)" :alt="ad.title" />
    <div v-if="ad" v-html="ad.description"></div>
    <span v-if="ad" >{{ ad.price }} Br</span>
    <span v-if="ad" >{{ ad.user }} </span>
    <p v-else>Загрузка...</p>
  </div>
</template>

<script>
import HeaderBoard from "@/components/HeaderBoard.vue";
import adsData from '/public/ad-data.json';

export default {
  data() {
    return {
      ad: null,
      ads: adsData
    };
  },
  components: {
    HeaderBoard,
  },
  props: ['id'],
  methods: {
    getImageUrl(image) {
      return require(`@/assets/jpg/${image}`);
    },
    fetchAdDetails() {
      const adId = parseInt(this.id, 10);
      this.ad = this.ads.find(ad => ad.id === adId);
    }
  },
  created() {
    this.fetchAdDetails();
  },
};
</script>
