<template>
<div class="editor-container">
  <div ref="score-container" class="score-container">
    <div class="score" ref="score">    
    </div>
    <div class="tools"></div>
  </div>
  <div class="control-container">
    <div class=""></div>
  </div>
</div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';
import { OpenSheetMusicDisplay, Cursor, VoiceEntry, Note, StemDirectionType } from 'opensheetmusicdisplay';
import axios from 'axios';

export default Vue.extend({
  data() {
    return {
      OSMDViewer: {} as any,
      demoSheet: '' as string,
    };
  },
  created() {
    this.createOSMDViewer();
  },
  methods: {
    async createOSMDViewer(): Promise<any> {
      await this.fetchDemoSheet();
      const container: HTMLElement = this.$refs.score as HTMLElement;

      this.OSMDViewer = new OpenSheetMusicDisplay(container, { autoResize: false });
      this.OSMDViewer.setLogLevel('info');
      this.OSMDViewer.load(this.demoSheet as string).then(() => {
        this.OSMDViewer.render();
      });
    },
    fetchDemoSheet() {
      return axios.post('/sheet/demo', {
        header: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      }).then((response) => {
        this.demoSheet = response.data;
      });
    },
  },
});

</script>

<style lang="scss" scoped>

.editor-container {
  display: flex;
  flex-direction: column;
  .score-container {
    height: 700px;
    display: flex;

    .score {
      width: 100%;
      overflow-y: scroll;
    }
    .tools {
      width: 5%;
      background-color: #CCCCCC;
    }
  }
  .control-container {
    background-color: #CCCCCC;
    width: 100%;
    height: 150px;
  }
}

</style>
