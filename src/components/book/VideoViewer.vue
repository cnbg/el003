<template>
  <div>
    <div v-if="!editing" class="video-container" @mouseover="showEdit" @mouseleave="hideEdit">
      <video-player
        class="video-player vjs-big-play-centered"
        :src="video.path"
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
      <Button v-if="isHovered" @click="startEdit" icon="pi pi-pencil" class="edit-button" />
    </div>
    <div v-else class="video-container">
      <div class="flex justify-end gap-2 edit-controls">
        <FileUpload 
          mode="basic" 
          name="cover" 
          accept="video/mp4,video/x-m4v,video/*"
          customUpload 
          @uploader="fileUploader" 
          auto
          :chooseLabel="$t('general.select-file')" 
        />
        <Button @click="deleteVideo" icon="pi pi-trash" severity="danger" />
        <Button @click="saveEdit" icon="pi pi-save" :label="$t('general.save')" severity="success" />
        <Button @click="cancelEdit" icon="pi pi-times" :label="$t('general.cancel')" class="p-button-danger" severity="secondary" />
      </div>
      <video-player
        class="video-player vjs-big-play-centered"
        :src="video.path"
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
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['content-updated'])

const editing = ref(false)
const player = ref(null)
const isHovered = ref(false)

const handleMounted = (payload) => {
  player.value = payload.player
}

const handleEvent = (log) => {
  console.log('Player event:', log)
}

const startEdit = () => {
  editing.value = true
}

const saveEdit = () => {
  emit('content-updated', props.video)
  editing.value = false
}

const cancelEdit = () => {
  editing.value = false
}

const deleteVideo = () => {
  emit('content-updated', null)
}

const fileUploader = async (event, video) => {
  const file = event.files[0]
  const reader = new FileReader()
  let blob = await fetch(file.objectURL).then((r) => r.blob())

  reader.readAsDataURL(blob)

  reader.onloadend = function() {
    video.path = reader.result
  }
}

const showEdit = () => {
  isHovered.value = true
}

const hideEdit = () => {
  isHovered.value = false
}
</script>

<style scoped>
.edit-button {
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 14px;
  position: absolute;
  top: 5px;
  right: 10px;
  visibility: hidden;
}

.video-player {
  background-color: black;
  width: 100%;
}

.video-container {
  position: relative;
}

.video-container:hover .edit-button {
  visibility: visible;
}
.edit-controls {
  margin-bottom: 10px;
}
</style>
