import { lazy } from 'react'

const ItemRoutes = [
  // Items
  {
    path: '/items/add-item',
    component: lazy(() => import('../../views/items'))
  }
]

export default ItemRoutes
