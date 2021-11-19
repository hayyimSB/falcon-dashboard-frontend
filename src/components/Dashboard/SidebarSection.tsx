import ChartPie from 'icons/ChartPie';

const SidebarSection = [
  {
    title: '',
    items: [
      {
        title: '대시보드',
        path: '/dashboard',
        icon: <ChartPie fontSize='small' />,
        children: [
          {
            title: 'CS 대시보드',
            path: '/dashboard/support',
          },
        ],
      },
    ],
  },
];

export default SidebarSection;
