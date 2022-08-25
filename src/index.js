import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App'

import '@fontsource/poppins'
import '@fontsource/domine'
import '@fontsource/mulish'

import { injectStore } from './utils/api'
injectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
