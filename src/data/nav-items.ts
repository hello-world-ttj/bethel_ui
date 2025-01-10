export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
    sublist: [
      {
        title: 'Dashboard',
        path: '/',
        active: false,
        collapsible: false,
      },
      {
        title: 'Sales',
        path: '/',
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Users',
    path: '/users',
    icon: 'mdi:users-outline',
    active: true,
    collapsible: false,
  },
  {
    title: 'Notification',
    path: '#!',
    icon: 'zondicons:notifications',
    active: false,
    collapsible: false,
  },
  {
    title: 'Calendar',
    path: '#!',
    icon: 'ph:calendar',
    active: false,
    collapsible: false,
  },
  {
    title: 'Message',
    path: '#!',
    icon: 'ph:chat-circle-dots-fill',
    active: false,
    collapsible: false,
  },
];

export default navItems;
