import Vue from 'vue'
import Router from 'vue-router'
import Gallery from '@/components/gallery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gallery',
      component: Gallery
    }
  ]
})
