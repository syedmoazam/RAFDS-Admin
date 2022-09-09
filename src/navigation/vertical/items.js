import { Archive, Circle } from 'react-feather'

export default [
  {
    id: 'items',
    title: 'Items',
    icon: <Archive size={20} />,
    badge: 'light-warning',
    badgeText: '1',
    children: [
      {
        id: 'addItems',
        title: 'Add-Items',
        icon: <Circle size={12} />,
        navLink: '/items/add-item'
      }
    ]
  }
]
