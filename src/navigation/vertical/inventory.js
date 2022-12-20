import { Archive, Circle } from 'react-feather'

export default [
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <Archive size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: 'viewInventory',
        title: 'Add / View Inventory',
        icon: <Circle size={12} />,
        navLink: '/inventory/view-inventory'
      },
      {
        id: 'assignInventory',
        title: 'Assign Inventory',
        icon: <Circle size={12} />,
        navLink: '/inventory/assign-inventory'
      },
      // {
      //   id: 'donateRequest',
      //   title: 'Inventory Donations',
      //   icon: <Circle size={12} />,
      //   navLink: '/inventory/donations'
      // }
    ]
  }
]
