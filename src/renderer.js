import './assets/base.css'
import 'primeicons/primeicons.css'

import app from './primevue'

import TopMenu from './components/common/TopMenu.vue'
import BookCard from './components/book/BookCard.vue'
import BookChapter from './components/book/Chapter.vue'
import BookGallery from './components/book/BookGallery.vue'
import ModelViewer from './components/book/ModelViewer.vue'
import SearchInput from './components/common/SearchInput.vue'
import QuillEditor from './components/book/QuillEditor.vue'
import NotFoundPage from './components/error/NotFoundPage.vue'

app.component('TopMenu', TopMenu)
app.component('BookCard', BookCard)
app.component('BookChapter', BookChapter)
app.component('BookGallery', BookGallery)
app.component('ModelViewer', ModelViewer)
app.component('SearchInput', SearchInput)
app.component('QuillEditor', QuillEditor)
app.component('NotFoundPage', NotFoundPage)

if(localStorage.getItem('darkMode') === 'true') {
    document.querySelector('html').classList.add('dark')
} else {
    document.querySelector('html').classList.remove('dark')
}

app.mount('#app')
