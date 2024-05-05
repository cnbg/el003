import './assets/base.css'
import 'primeicons/primeicons.css'
import 'katex/dist/katex.min.css'

import app from './primevue'

import BookCard from './components/book/BookCard.vue'
import BookChapter from './components/book/Chapter.vue'
import ImageViewer from './components/book/ImageViewer.vue'
import VideoViewer from './components/book/VideoViewer.vue'
import ModelViewer from './components/book/ModelViewer.vue'
import HtmlEditor from './components/book/HtmlEditor.vue'
import ImageEditor from './components/book/ImageEditor.vue'
import VideoEditor from './components/book/VideoEditor.vue'

import TopMenu from './components/common/TopMenu.vue'
import SearchInput from './components/common/SearchInput.vue'
import ConfirmationDialog from './components/common/ConfirmationDialog.vue'
import NotFoundPage from './components/error/NotFoundPage.vue'

app.component('BookCard', BookCard)
app.component('BookChapter', BookChapter)
app.component('ImageViewer', ImageViewer)
app.component('VideoViewer', VideoViewer)
app.component('ModelViewer', ModelViewer)
app.component('HtmlEditor', HtmlEditor)
app.component('ImageEditor', ImageEditor)
app.component('VideoEditor', VideoEditor)

app.component('TopMenu', TopMenu)
app.component('SearchInput', SearchInput)
app.component('ConfirmationDialog', ConfirmationDialog)
app.component('NotFoundPage', NotFoundPage)

if(localStorage.getItem('darkMode') === 'true') {
    document.querySelector('html').classList.add('dark')
} else {
    document.querySelector('html').classList.remove('dark')
}

app.mount('#app')
