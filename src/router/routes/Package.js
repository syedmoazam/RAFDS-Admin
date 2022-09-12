import { lazy } from 'react'

const PackageRoutes = [
  // Package
  {
    path: '/package/view-package',
    component: lazy(() => import('../../views/package/package-list'))
  }
]

export default PackageRoutes
