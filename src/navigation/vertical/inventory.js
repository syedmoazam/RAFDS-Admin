import { Archive, Circle } from 'react-feather'

export default [
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <Archive size={20} />,
    badge: 'light-warning',
    badgeText: '1',
    children: [
      {
        id: 'viewInventory',
        title: 'View Inventory',
        icon: <Circle size={12} />,
        navLink: '/inventory/view-inventory'
      }
    ]
  }
]
