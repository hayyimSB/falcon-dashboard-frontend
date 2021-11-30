import axios from 'axios';
import { useMutation } from 'react-query';
import stores from '../../../stores/index';
// import { io } from 'socket.io-client';

const httpRequestActions: any = {};

const getRequestAction = (requestAction, paramObj: null | object) => {
  if (paramObj) {
    const paramArr = Object.entries(paramObj).filter((el) => el[1] !== '');
    paramArr.forEach((el) => (el[1] = encodeURIComponent(el[1])));
    const paramArrToQuery = paramArr.map((el) => el.join('=')).join('&');
    if (paramArr.every((el) => el[1] === '')) {
      return requestAction;
    }
    return {
      method: requestAction.method,
      path: requestAction.path + '?' + paramArrToQuery,
    };
  }
  return requestAction;
};

const postRequestAction = (requestAction, id) => {
  requestAction.path = requestAction.path + '/' + id;
  return requestAction;
};

const socket = new WebSocket(
  process.env.REACT_APP_DOMAIN || 'ws://localhost:4041'
);

const httpRequestToSandbank = async ({
  method,
  path,
  accessToken = undefined,
  data = undefined,
}) => {
  try {
    const res = await axios({
      method,
      url:
        (process.env.REACT_APP_DOMAIN || 'http://localhost:3001') + `${path}`,
      headers: {
        'AUTH-SANDBANK': '7GkEW9Bl2mLde9IqEfFE',
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 304;
      },
      data,
    });
    console.log(res);
    return res;
  } catch (error) {
    stores.settings.setErrorMessage(error.response);
    console.log(error.response);
    return;
  }
};

const useVerifyOtp = () =>
  useMutation((req) => httpRequestToSandbank(req as any), {
    onSuccess: (res) => {
      console.log('onSuccess: useVerifyOtp');
      console.log(res);
    },
    onError: (err) => {
      console.log('onError: useVerifyOtp');
      console.log(err);
    },
  });

//dashboard

export {
  httpRequestActions,
  getRequestAction,
  postRequestAction,
  useVerifyOtp,
  socket,
};
