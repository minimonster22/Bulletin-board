<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p class="enter-text">Подать объявление</p>
      <div class="card flex justify-center">
        <Toast/>
        <FileUpload mode="basic" name='demo' url="http://localhost:3000/api/upload" accept="image/*" :maxFileSize="1000000"
                    @upload="onUpload" :auto="true" chooseLabel="Browse"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'primevue/toast';
import FileUpload from 'primevue/fileupload';

export default {
  name: "PutAdModal",
  components: {
    Toast,
    FileUpload
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onUpload(event) {
      this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
      console.log('Upload event:', event);
    },
  }
}
</script>


<style scoped>
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  position: relative;
  gap: 20px
}

</style>