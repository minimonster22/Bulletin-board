<template>
  <div class="header">
    <i class="pi pi-warehouse" style="font-size: 2rem"></i>
    <div class="name">Доска объявлений</div>
    <div class="icon-login">
      <i class="pi pi-user" style="font-size: 2rem"></i>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HeaderBoard',
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7vh;
  background-color: var(--primary-color);
  padding-left: 70px;
  padding-right: 25px;
  font-family: Mulish,sans-serif;
  font-size: 2vw;
}
</style>