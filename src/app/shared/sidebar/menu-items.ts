import { RouteInfo } from './sidebar.metadata';


export const ROUTES: RouteInfo[] = [
 
  {
    path: '/main/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '#',
    title: 'Formulir',
    icon: 'bi bi-file-earmark',
    class: '',
    extralink: false,
    dropdown: true,
    submenu: [
        {
          path: '/main/component/form-itcm',
          title: 'Form ITCM',
          icon: 'bi bi-file-earmark',
          class: '',
          extralink: false,
          submenu: [],
        },
        {
          path: '/main/component/form-da',
          title: 'Form DA',
          icon: 'bi bi-file-earmark',
          class: '',
          extralink: false,
          submenu: [],
        },
        {
          path: '/main/component/ba-itcm',
          title: 'BA ITCM',
          icon: 'bi bi-file-earmark',
          class: '',
          extralink: false,
          submenu: [],
        },
        {
          path: '/main/component/hak-akses',
          title: 'Hak Akses',
          icon: 'bi bi-file-earmark',
          class: '',
          extralink: false,
          submenu: [],
        }
        
    ],
  },
  {
    path: '#',
    title: 'Settings',
    icon: 'bi bi-gear',
    class: '',
    extralink: false,
    dropdown: true,
    submenu: [
      {
        path: '/main/component/user-control',
        title: 'User Control',
        icon: 'bi bi-person',
        class: '',
        extralink: false,
        submenu: [],
        role_code: ['SA'],
      },
      {
        path: '/main/component/document-control',
        title: 'Document Control',
        icon: 'bi bi-file-plus',
        class: '',
        extralink: false, 
        submenu: []
      },
      {
        path: '/main/component/product',
        title: 'Product',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: '/main/component/project',
        title: 'Project',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: '/main/component/application',
        title: 'Aplikasi',
        icon: 'bi bi-file-earmark',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/main/component/division',
        title: 'Divisi',
        icon: 'bi bi-person-rolodex',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/main/component/grup-akses',
        title: 'Grup Akses',
        icon: 'bi bi-universal-access-circle',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/main/component/otoritas',
        title: 'Otoritas',
        icon: 'bi bi-person-rolodex',
        class: '',
        extralink: false,
        submenu: []
      }
    ],
  },
];