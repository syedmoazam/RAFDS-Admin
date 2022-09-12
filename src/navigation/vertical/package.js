import { Circle, Package } from 'react-feather'

export default [
  {
    id: 'package',
    title: 'Packages',
    icon: <Package size={20} />,
    badge: 'light-warning',
    badgeText: '1',
    children: [
      {
        id: 'viewPackages',
        title: 'Add / View Package',
        icon: <Circle size={12} />,
        navLink: '/package/view-package'
      }
    ]
  }
]
