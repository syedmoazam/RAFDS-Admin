import { lazy } from 'react'

const InventoryRoutes = [
  // Inventory
  {
    path: '/inventory/view-inventory',
    component: lazy(() => import('../../views/inventory/inventory-list'))
  }
]

export default InventoryRoutes
