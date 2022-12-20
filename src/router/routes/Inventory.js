import { lazy } from 'react'

const InventoryRoutes = [
  // Inventory
  {
    path: '/inventory/view-inventory',
    component: lazy(() => import('../../views/inventory/inventory-list'))
  },
  {
    path: '/inventory/assign-inventory',
    component: lazy(() => import('../../views/inventory/assign-inventory'))
  },
  {
    path: '/inventory/donations',
    component: lazy(() => import('../../views/inventory/donate-request'))
  }
]

export default InventoryRoutes
