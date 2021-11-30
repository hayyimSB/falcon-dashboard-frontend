import type { FC } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import type { AppBarProps } from '@material-ui/core';
import MenuIcon from 'icons/Menu';
import { useStores } from 'hooks/useStores';
import UISettingsDrawer from 'components/SettingsDrawer';
interface DashboardNavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    color: theme.palette.primary.contrastText,
  }),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
  }),
  zIndex: theme.zIndex.drawer + 100,
}));

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { settings } = useStores();
  const { onSidebarMobileOpen } = props;

  const handleClickLogout = () => {
    localStorage.clear();
    settings.setInit();
    window.location.reload();
  };

  return (
    <DashboardNavbarRoot>
      <Toolbar
        sx={{ minHeight: 64, display: 'flex', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color='inherit'
            onClick={onSidebarMobileOpen}
            sx={{ mr: 1 }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{ height: 40, width: 40 }}
                src='/assets/images/logo.png'
                alt=''
              />
              <Typography sx={{ ml: 2 }} variant='h6'>
                Falcon Dashboard
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant='text' color='secondary' onClick={handleClickLogout}>
            로그아웃
          </Button>
          <UISettingsDrawer />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func,
};

export default DashboardNavbar;
