import { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography } from '@material-ui/core';
import type { Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavSection from 'components/NavSection';
import Scrollbar from 'components/Scrollbar';
import SidebarSection from 'components/Dashboard/SidebarSection';
import { useStores } from 'hooks/useStores';
import Countdown from 'react-countdown';
import { ToastMessage } from 'utils/text';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'awsconfig';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const { settings } = useStores();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const [extendLoginBtn, setExtendLoginBtn] = useState<boolean>(false);
  const [extendLoginBtnDisabled, setExtendLoginBtnDisabled] =
    useState<boolean>(false);
  const [cautionAutoLogout, setCautionAutoLogout] = useState<boolean>(false);
  const cognito = 'CognitoIdentityServiceProvider';
  const userPoolId = Amplify.configure(awsconfig)['Auth'].userPoolWebClientId;
  const lastAuthUser = localStorage.getItem(
    cognito + '.' + userPoolId + '.LastAuthUser'
  );
  const [, updateState] = useState<any>();
  const forceRender = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    settings.setInit();
    window.location.reload();
  };

  const handleClickExtendLoginBtn = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = await Auth.currentSession();
    try {
      setExtendLoginBtnDisabled(true);
      cognitoUser.refreshSession(
        currentSession['refreshToken'],
        (err, session) => {
          const { idToken, refreshToken, accessToken } = session;
          if (err) {
            toast.error(err);
            return;
          }
          localStorage.setItem(
            cognito + '.' + userPoolId + '.' + lastAuthUser + '.idToken',
            idToken.jwtToken
          );
          localStorage.setItem(
            cognito + '.' + userPoolId + '.' + lastAuthUser + '.accessToken',
            accessToken.jwtToken
          );
          localStorage.setItem(
            cognito + '.' + userPoolId + '.' + lastAuthUser + '.refreshToken',
            refreshToken.token
          );
          settings.setAccessToken(accessToken.jwtToken);
          const expiredTime = jwt_decode(accessToken.jwtToken)['exp'] * 1000;
          settings.setTokenExpiredTime(expiredTime);
          toast.success(ToastMessage.EXTEND_LOGIN_SUCCESS);
          setExtendLoginBtnDisabled(false);
          //새 토큰 발급 후 렌더링 안되는 현상으로 인해 임시 추가
          forceRender();
        }
      );
    } catch (e) {
      console.log('Unable to refresh Token', e);
    }
  };

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      handleLogout();
      return <span>00:00</span>;
    }
    if (minutes <= 9) {
      setExtendLoginBtn(true);
      setCautionAutoLogout(true);
    }
    return (
      <span>
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </span>
    );
  };

  useEffect(() => {
    setExtendLoginBtn(false);
    setCautionAutoLogout(false);
  }, [settings.tokenExpiredTime]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: cautionAutoLogout
                ? 'error.main'
                : 'background.default',
              borderRadius: 1,
              overflow: 'hidden',
              p: 2,
            }}
          >
            <Box>
              <Typography color='textPrimary' variant='subtitle2'>
                안녕하세요, {settings.adminInfo.name} 님
              </Typography>
              <Typography
                color={cautionAutoLogout ? 'textPrimary' : 'textSecondary'}
                variant='body2'
              >
                Email: {settings.adminInfo.email}
              </Typography>
              <Typography color='textPrimary' variant='body2' sx={{ mt: 1 }}>
                남은 시간:{' '}
                <Countdown
                  date={settings.tokenExpiredTime}
                  renderer={countdownRenderer}
                />
              </Typography>
              {extendLoginBtn && (
                <Button
                  fullWidth={true}
                  color='inherit'
                  variant='outlined'
                  sx={{ mt: 1 }}
                  onClick={handleClickExtendLoginBtn}
                  disabled={extendLoginBtnDisabled}
                >
                  로그인 연장하기
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {SidebarSection.map((section, idx) => (
            <NavSection
              key={idx}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100% - 64px) !important',
            top: '64px !Important',
            width: 280,
          },
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 280,
        },
      }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default DashboardSidebar;
