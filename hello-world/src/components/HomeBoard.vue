<template>
  <HeaderBoard/>
  <MainBoard/>
</template>

<script>
import HeaderBoard from "@/components/HeaderBoard.vue";
import MainBoard from "@/components/MainBoard.vue";

export default {
  name: 'HomeBoard',
  components: {
    HeaderBoard,
    MainBoard,
  }
}

</script>


<style scoped>

</style>
