
const routes = [
  {
    path: '/',
    component: () => import('layouts/firstvisit/StartLayout.vue'),
    children: [
      { 
        path: '', component: () => import('pages/firstvisit/Index.vue')
      },
      { 
        path: 'seed-phrase', component: () => import('pages/firstvisit/WalletSeedPhrase.vue')
      },
    ]
  },
  {
    path: '/explore',
    component: () => import('layouts/explore/ExploreLayout.vue'),
    children: [
      { 
        path: '', component: () => import('pages/explore/Index.vue')
      },
      {
        path: '/bch-wallet-balance',
        component: () => import('pages/explore/bchwallet.vue')
      },
    ]
  },
  {
    path: '/setting',
    component: () => import('layouts/setting/SettingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/setting/Index.vue') },
    ]
  },
  {
    path: '/cash-drop',
    component: () => import('layouts/cashdrop/CashDropLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cashdrop/Index.vue') }
    ]
  },
  {
    path: '/collect',
    component: () => import('layouts/collect/CollectLayout.vue'),
    children: [
      { path: '', component: () => import('pages/collect/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
