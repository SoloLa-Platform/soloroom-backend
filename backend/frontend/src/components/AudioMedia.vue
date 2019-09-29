<template>
  <div>
    <div class="video-container">
      <div class="title">This is video Title</div>
      <!-- <div class="video-frame"></div> -->
      </div>
    <div class="youtube-source">
      <label for="youtube-url input-label">Youtube URL</label>
      <input id="youtube-url" type="text">
      <button class="primary transcribe">Transcribe</button>
    </div>
    <div class="upload-source">
      <label for="upload-audio">Upload audio</label>
      <input id="upload-audio" type="file">
      <button>Upload</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style lang="scss" scoped>
  .video-container {
    padding: 1em;


    .title {
      font-size: 1.5em;
      font-weight: 1000;
      line-height: 2.4em;
    }
    .video-frame {
      background-color: #111111;
      width: 450px;
      height: 270px;
    }

  }

  .input-label {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
  }
  .primary {
    background-color: #2173FF;
    color: white;
    height: 2em;
  }

  .transcribe { 
    width: 8em;
  }
</style>
