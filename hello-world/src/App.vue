<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  name: 'App',

}
</script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 20px;
}
</style>
