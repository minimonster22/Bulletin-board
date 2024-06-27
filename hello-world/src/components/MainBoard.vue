<template>

  <div class="main-container">

    <div class="ads-container">
      <AdsField/>
    </div>

  </div>
</template>

<script>


import AdsField from "@/components/AdsField.vue";


export default {
  name: 'MainBoard',
  components: {

    AdsField,


  }
}

</script>

<style scoped>

.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.ads-container {
  display: flex;
  flex-direction: column;
}

</style>