import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import DashboardNavbar from 'components/Dashboard/DashboardNavbar';
import DashboardSidebar from 'components/Dashboard/DashboardSidebar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));

const DashboardLayoutWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: '64px',
  // [theme.breakpoints.up('lg')]: {
  //   paddingLeft: '280px',
  // },
}));

const DashboardLayoutContainer = experimentalStyled('div')({
  // display: 'flex',
  // flex: '1 1 auto',
  width: '100%',
  overflow: 'hidden',
});

const DashboardLayoutContent = experimentalStyled('div')({
  // flex: '1 1 auto',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  position: 'relative',
  WebkitOverflowScrolling: 'touch',
});

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] =
    useState<boolean>(false);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar
        onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)}
      />
      <DashboardSidebar
        open={isSidebarMobileOpen}
        onClose={(): void => setIsSidebarMobileOpen(false)}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
