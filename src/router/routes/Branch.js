import { lazy } from 'react'

const BranchRoutes = [
  // Branch
  {
    path: '/branch/view-branch',
    component: lazy(() => import('../../views/branch/branch-list'))
  },
  {
    path: '/branch/inventory/:id',
    component: lazy(() => import('../../views/branch/branch-inventory'))
  },
  {
    path: '/branch/requests/:id',
    component: lazy(() => import('../../views/branch/branch-request'))
  }
]

export default BranchRoutes
