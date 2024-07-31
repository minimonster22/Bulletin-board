<template>
  <HeaderBoard/>
  <PutAdBtn/>
  <MainBoard/>
</template>

<script>
import HeaderBoard from "@/components/HeaderBoard.vue";
import MainBoard from "@/components/MainBoard.vue";
import PutAdBtn from "@/components/PutAdBtn.vue";

export default {
  name: 'HomeBoard',
  components: {
    HeaderBoard,
    MainBoard,
    PutAdBtn,
  }
}

</script>


<style scoped>

</style>
