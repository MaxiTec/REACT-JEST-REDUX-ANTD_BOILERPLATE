const MenuRoutes = [
  {
    key: 'dashboard',
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'icon-home',
    children: [
      { name: 'Global', path: '/dashboard' },
      { name: 'Ventas', path: '/dashboard/ventas' },
    ],
  },
  {
    key: 'hoteles',
    path: '/hoteles',
    name: 'Hoteles',
    icon: 'icon-bed',
    children: [
      { name: 'Listado de Hoteles', path: '/hoteles' },
      { name: 'Nuevo Hotel', path: '/hoteles/agregar' },
      {
        name: 'Catálogos',
        key: 'catalogos',
        children: [
          { name: 'Servicios del Hoteles', path: '/hoteles/servicios' },
          { name: 'Amenidades del Hoteles', path: '/hoteles/amenidades' },
        ],
      },
    ],
  },
  {
    key: 'tours',
    path: '/tours',
    name: 'Tours',
    icon: 'icon-map',
    children: [
      { name: 'Listado de Tours', path: '/tours' },
      { name: 'Nuevo Tour', path: '/tours/agregar' },
      { name: 'Categorías de Tour', path: '/tour-categorias' },
      { name: 'Paquetes', path: '/tour-paquetes' },
      { name: 'Tarifas', path: '/tour-tarifas' },
    ],
  },
  {
    key: 'test',
    path: '/test',
    name: 'Tests',
    icon: 'icon-user-plus',
    children: [
      { name: 'Listado de Test', path: '/test' },
      { name: 'Nuevo Test', path: '/test/agregar' },
      { name: 'Categorías de Test', path: '/test-categorias' },
      { name: 'paquetes', path: '/test-paquetes' },
      { name: 'Tarifas', path: '/test-tarifas' },
    ],
  },
];
const rootSubmenuKeys = MenuRoutes.map(ele => ele.key);

export { MenuRoutes, rootSubmenuKeys };
