
const routes = [
  {
    path: '/',
    component: () => import('layouts/firstvisit/StartLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/firstvisit/Index.vue')
      },
      {
        path: '/seed-phrase', component: () => import('pages/firstvisit/WalletSeedPhrase.vue')
      }
    ]
  },
  {
    path: '/explore',
    component: () => import('layouts/explore/ExploreLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/explore/Index.vue')
      }
    ]
  },
  {
    path: '/setting',
    component: () => import('layouts/setting/SettingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/setting/Index.vue') },
      { path: 'recovery-seed', component: () => import('pages/setting/RecoverySeed.vue') },
      { path: 'receive', component: () => import('pages/setting/Receive.vue') }
    ]
  },
  {
    path: '/cash-drop',
    component: () => import('layouts/cashdrop/CashDropLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cashdrop/Index.vue') },
      { path: 'payment', component: () => import('pages/cashdrop/Payment.vue') }
    ]
  },
  {
    path: '/collect',
    component: () => import('layouts/collect/CollectLayout.vue'),
    children: [
      { path: '', component: () => import('pages/collect/Index.vue') }
    ]
  },
  {
    path: '/confirm-transaction',
    component: () => import('layouts/confirmTxn/confirmTransaction.vue'),
    children: [
      { path: '', component: () => import('pages/confirmTxn/Index.vue') },
      { path: 'successful-transaction', component: () => import('pages/confirmTxn/successfulTransaction.vue') }
    ]
  },
  {
    path: '/purelypeer-menu',
    component: () => import('layouts/menu/PurelyPeerMenu.vue'),
    children: [
      { path: '', component: () => import('pages/menu/Index.vue') }
    ]
  },
  {
    path: '/qrcode',
    component: () => import('layouts/qrcode.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
