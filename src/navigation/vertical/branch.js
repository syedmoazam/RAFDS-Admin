import { Inbox, Circle } from 'react-feather'

export default [
  {
    id: 'branch',
    title: 'Branch',
    icon: <Inbox size={20} />,
    badge: 'light-warning',
    badgeText: '1',
    children: [
      {
        id: 'viewBranch',
        title: 'Add / View Branch',
        icon: <Circle size={12} />,
        navLink: '/branch/view-branch'
      }
    ]
  }
]
