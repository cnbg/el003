<template>
  <div>
    <Panel>
      <template #header>
        <div>{{ $t('general.chapters') }}</div>
      </template>
      <template #icons>
        <button @click="addChapterBtn"
                class="p-panel-header-icon p-link"
                v-tooltip="$t('general.add-chapter')">
          <i class="pi pi-plus"></i>
        </button>
        <button v-if="bookSt.chapter"
                @click="editChapterBtn"
                class="p-panel-header-icon p-link ml-6"
                v-tooltip="$t('general.edit-chapter')">
          <i class="pi pi-pencil"></i>
        </button>
        <div class="copy-link-container">
          <button @click="copyLink"
                  class="copy-link-button p-panel-header-icon p-link ml-6"
                  v-tooltip="$t('general.Copy-link')">
            <i class="pi pi-link"></i>
          </button>
          <Dialog v-model:visible="linkCopied" modal style="max-width: 400px;">
            <div class="p-4">
              <div class="flex items-center mt-4">
                <InputText v-model="copiedLink" class="w-[25rem] mr-2" readonly />
                <Button @click="copyToClipboard"
                v-tooltip="$t('general.Copy')">              
                  <i class="pi pi-copy"></i>
                </Button>
              </div>
              <p class="text-lg mt-4">{{ dialogMessage }}</p>
            </div>
            <transition name="fade">
            <div v-if="showNotification" class="notification">
              {{ t('general.link-copied') }}
            </div>
            </transition>
          </Dialog>
        </div>
      </template>
      <div class="flex flex-col">
        <ScrollPanel class="w-full" style="height: calc(100vh - 210px)">
          <EditChapter :chapters="bookSt.getChapters(null)" />
          <ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" />
        </ScrollPanel>
      </div>
      <Dialog v-model:visible="showEditDialog" modal :header="$t('general.add-chapter')" class="w-30rem">
        <EditChapterDialog :chapter="chapter" @close="onCloseDialog" />
      </Dialog>
    </Panel>
  </div>
</template>

<script setup>
import EditChapter from './EditChapter.vue'
import EditChapterDialog from './EditChapterDialog.vue'
import { ref } from 'vue'
import { useBookStore } from '../../../stores/book'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const bookSt = useBookStore()
const chapter = ref({})
const showEditDialog = ref(false)
const linkCopied = ref(false)
const copiedLink = ref('')
const dialogMessage = ref('')
const showNotification = ref(false)

const addChapterBtn = () => {
  chapter.value = bookSt.chapterObj({
    parent: bookSt.chapter?.id ?? null,
  })
  showEditDialog.value = true
}

const editChapterBtn = () => {
  chapter.value = { ...bookSt.chapter }
  showEditDialog.value = true
}

const onCloseDialog = (ch = {}) => {
  if (ch.id) {
    bookSt.updateChapter(ch)
  } else {
    bookSt.saveChapter(ch)
  }
  chapter.value = {}
  showEditDialog.value = false
}

const copyLink = () => {
  const currentUrl = window.location.href
  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      copiedLink.value = currentUrl
      dialogMessage.value = '' 
      linkCopied.value = true
    })
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(copiedLink.value)
    .then(() => {          
      showNotification.value = true
      setTimeout(() => {
        linkCopied.value = false
        showNotification.value = false
      }, 1300)
    })
}
</script>

<style scoped>
.copy-link-container {
  position: relative;
  display: inline-block;
}

.copy-link-container .copy-link-button {
  margin-right: 10px;
}

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
