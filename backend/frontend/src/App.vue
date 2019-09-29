<template>
  <div id="app">
    <Transcription/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Transcription from '@/pages/transcription/Transcription.vue';
export default Vue.extend({
  name: 'App',
  components: {
    Transcription,
  },
});
</script>

<style lang="scss">
  
</style>
