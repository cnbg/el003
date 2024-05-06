import './assets/base.css'
import 'primeicons/primeicons.css'

import app from './primevue'

import BookCard from './components/book/BookCard.vue'
import ContentViewer from './components/book/ContentViewer.vue'
import HtmlEditor from './components/book/HtmlEditor.vue'
import ImageViewer from './components/book/ImageViewer.vue'
import ImageEditor from './components/book/ImageEditor.vue'
import ModelViewer from './components/book/ModelViewer.vue'
import ModelEditor from './components/book/ModelEditor.vue'
import VideoViewer from './components/book/VideoViewer.vue'
import VideoEditor from './components/book/VideoEditor.vue'
import TestViewer from './components/book/TestViewer.vue'
import TestEditor from './components/book/TestEditor.vue'
import BoardViewer from './components/book/BoardViewer.vue'
import BoardEditor from './components/book/BoardEditor.vue'

import TopMenu from './components/common/TopMenu.vue'
import SearchInput from './components/common/SearchInput.vue'
import ConfirmationDialog from './components/common/ConfirmationDialog.vue'
import NotFoundPage from './components/error/NotFoundPage.vue'

app.component('BookCard', BookCard)
app.component('ContentViewer', ContentViewer)
app.component('HtmlEditor', HtmlEditor)
app.component('ImageViewer', ImageViewer)
app.component('ImageEditor', ImageEditor)
app.component('ModelViewer', ModelViewer)
app.component('ModelEditor', ModelEditor)
app.component('VideoViewer', VideoViewer)
app.component('VideoEditor', VideoEditor)
app.component('TestViewer', TestViewer)
app.component('TestEditor', TestEditor)
app.component('BoardViewer', BoardViewer)
app.component('BoardEditor', BoardEditor)

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
