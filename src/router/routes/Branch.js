import { lazy } from 'react'

const BranchRoutes = [
  // Inventory
  {
    path: '/branch/view-branch',
    component: lazy(() => import('../../views/branch/branch-list'))
  }
]

export default BranchRoutes
