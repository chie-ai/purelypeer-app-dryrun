
const routes = [
  {
    path: '/',
    component: () => import('layouts/explore/ExploreLayout.vue'),
    children: [
      { path: '', component: () => import('pages/explore/Index.vue') }
    ]
  },
  /*{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },*/

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
