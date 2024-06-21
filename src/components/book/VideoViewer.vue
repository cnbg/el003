<template>
  <video-player
      class="video-player vjs-big-play-centered"
      :src="getVideoSrc(video.path)"
      poster=""
      crossorigin="anonymous"
      playsinline
      controls
      :volume="0.6"
      :height="320"
      :playback-rates="[0.7, 1.0, 1.5, 2.0]"
      @mounted="handleMounted"
      @ready="handleEvent($event)"
      @play="handleEvent($event)"
      @pause="handleEvent($event)"
      @ended="handleEvent($event)"
      @loadeddata="handleEvent($event)"
      @waiting="handleEvent($event)"
      @playing="handleEvent($event)"
      @canplay="handleEvent($event)"
      @canplaythrough="handleEvent($event)"
      @timeupdate="handleEvent(player?.currentTime())"
  />
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref, onMounted } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

type VideoJsPlayer = ReturnType<typeof videojs>
interface Paths {
  resourcesPath?: string;
  userDataPath?: string;
  appPath?: string;
}

export default defineComponent({
  name: 'vue-basic-player-example',
  title: 'Basic player (Vue)',
  url: import.meta.url,
  components: {
    VideoPlayer
  },
  props: ['video'],
  setup() {
    const player = shallowRef<VideoJsPlayer>()

    const paths = ref<Paths>({});

    const electron = (window as any).electron;
    if (!electron) {
      throw new Error("Electron API not available");
    }

    const fetchPaths = async () => {
      try {
        paths.value = await electron.getPaths();
      } catch (error) {
        console.error('Error fetching paths:', error);
      }
    };

    const getVideoSrc = (videoSrc: string): string => {
      if (paths.value.resourcesPath) {
        return `${paths.value.resourcesPath}/${videoSrc}`;
      }
      return videoSrc;
    };

    onMounted(() => {
      fetchPaths();
    });

    const handleMounted = (payload: any) => {
      player.value = payload.player
      //console.log('Basic player mounted', payload)
    }

    const handleEvent = (log: any) => {
      //console.log('Basic player event', log)
    }

    return { player, handleMounted, handleEvent, getVideoSrc }
  }
})
</script>

<style scoped>
.video-player {
  background-color: black;
  width: 100%;
}
</style>
