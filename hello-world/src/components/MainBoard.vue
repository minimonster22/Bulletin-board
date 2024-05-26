<template>
  <SearchLine/>
  <div class="main-container">
    <FilterLine/>
    <div class="ads-container">
      <SortingLine/>
      <AdsField/>
    </div>
    <AddAds/>
  </div>
</template>

<script>

import SearchLine from "@/components/SearchLine.vue";
import SortingLine from "@/components/SortingLine.vue";
import FilterLine from "@/components/FilterLine.vue";
import AddAds from "@/components/AddAds.vue";
import AdsField from "@/components/AdsField.vue";

export default {
  name: 'MainBoard',
  components: {
    SearchLine,
    SortingLine,
    FilterLine,
    AdsField,
    AddAds
  }
}

</script>

<style scoped>

.main-container {
  display: flex;
  flex-direction: row;
}

.ads-container {
  display: flex;
  flex-direction: column;
}

</style>