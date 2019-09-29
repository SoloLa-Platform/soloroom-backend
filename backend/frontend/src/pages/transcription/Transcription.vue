<template>
  <div class="editor-container">
      <div class="header">
        <h1>Solola</h1>
      </div>
      <div class="transcription-content">
        <div class="media">
          <AudioMedia/>
        </div>
        <div class="score-editor-container">
          <Editor/>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Editor from '@/components/Editor.vue';
import AudioMedia from '@/components/AudioMedia.vue';

export default {
  data() {
    return {
      viewer: Object,
    };
  },
  components: {
    Editor,
    AudioMedia,
  },
};
</script>
<style lang="scss" scoped>
$header-height: 80px;
$media-width: 560px;
$laptop-width: 1366px;
$laptop-height: 768px;

.editor-container {
  display: flex;
  flex-direction: column;

  .header {
      height: $header-height; 
      background-color: #3C3B3B;
      color: #EEEEEE;
    }
  .transcription-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    .media {
      width: $media-width;
      background: #ECECEC;
    }

    .score-editor-container {
      width: 100%;
      // @media screen and (min-width: 1366px) {
      //   width: 100%;
      // }
    }
  }
}
</style>>


