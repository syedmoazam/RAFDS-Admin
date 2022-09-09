import { Gift, Circle } from 'react-feather'

export default [
  {
    id: 'items',
    title: 'Items',
    icon: <Gift size={20} />,
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
