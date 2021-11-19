import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const MainDashboard = Loadable(lazy(() => import('./pages/Main')));

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <MainDashboard />,
      },
    ],
  },
];

export default routes;
