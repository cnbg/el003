import './assets/base.css'
import 'primeicons/primeicons.css'

import app from './primevue'

import BookCard from './components/book/BookCard.vue'
import ContentEditor from './components/book/ContentEditor.vue'
import ContentViewer from './components/book/ContentViewer.vue'
import HtmlEditor from './components/book/HtmlEditor5.vue'
import HtmlViewer from './components/book/HtmlViewer.vue'
import ImageViewer from './components/book/ImageViewer.vue'
import ImageEditor from './components/book/ImageEditor.vue'
import Model3DViewer from './components/book/Model3DViewer.vue'
import Model3DEditor from './components/book/Model3DEditor.vue'
import VideoViewer from './components/book/VideoViewer.vue'
import VideoEditor from './components/book/VideoEditor.vue'
import TestViewer from './components/book/TestViewer.vue'
import TestEditor from './components/book/TestEditor.vue'
import BoardViewer from './components/book/BoardViewer.vue'
import BoardEditor from './components/book/BoardEditor.vue'
import PptEditor from './components/book/PptEditor.vue'
import PptViewer from './components/book/PptViewer.vue'

import TopMenu from './components/common/TopMenu.vue'
import SearchInput from './components/common/SearchInput.vue'
import ConfirmationDialog from './components/common/ConfirmationDialog.vue'
import NotFoundPage from './components/error/NotFoundPage.vue'

app.component('BookCard', BookCard)
app.component('ContentEditor', ContentEditor)
app.component('ContentViewer', ContentViewer)
app.component('HtmlEditor', HtmlEditor)
app.component('HtmlViewer', HtmlViewer)
app.component('ImageViewer', ImageViewer)
app.component('ImageEditor', ImageEditor)
app.component('Model3DViewer', Model3DViewer)
app.component('Model3DEditor', Model3DEditor)
app.component('VideoViewer', VideoViewer)
app.component('VideoEditor', VideoEditor)
app.component('TestViewer', TestViewer)
app.component('TestEditor', TestEditor)
app.component('BoardViewer', BoardViewer)
app.component('BoardEditor', BoardEditor)
app.component('PptEditor', PptEditor)
app.component('PptViewer', PptViewer)

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
