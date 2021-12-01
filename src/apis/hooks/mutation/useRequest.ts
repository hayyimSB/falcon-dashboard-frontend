import axios from 'axios';
import { useMutation } from 'react-query';
import stores from '../../../stores/index';
// import { io } from 'socket.io-client';

const requestActions: any = {
  FETCH_HISTORY_DATA: (pair: string) => {
    return { method: 'get', path: `/falcon/history/spread/${pair}` };
  },
};

const getRequestAction = (requestAction, paramObj: null | object) => {
  if (paramObj) {
    const paramArr = Object.entries(paramObj).filter((el) => el[1] !== '');
    // paramArr.forEach((el) => (el[1] = encodeURIComponent(el[1])));
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

const requestToSandbank = async ({
  method,
  path,
  accessToken = undefined,
  data = undefined,
}) => {
  try {
    const res = await axios({
      method,
      url:
        (process.env.REACT_APP_DOMAIN || 'http://localhost:3003') + `${path}`,
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
  useMutation((req) => requestToSandbank(req as any), {
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
const useFetchHistoryData = () =>
  useMutation((req) => requestToSandbank(req as any), {
    onSuccess: (res) => {
      console.log('onSuccess: useFetchHistoryData');
      console.log(res);
      switch (res?.data.data[0]['pair']) {
        case 'BTC-USDT':
          stores.settings.setBtcData(res?.data.data);
          break;
        case 'ETH-USDT':
          stores.settings.setEthData(res?.data.data);
          break;
        case 'ADA-USDT':
          stores.settings.setAdaData(res?.data.data);
          break;
        case 'BCH-USDT':
          stores.settings.setBchData(res?.data.data);
          break;
        case 'BSV-USDT':
          stores.settings.setBsvData(res?.data.data);
          break;
        case 'DOT-USDT':
          stores.settings.setDotData(res?.data.data);
          break;
        case 'EOS-USDT':
          stores.settings.setEosData(res?.data.data);
          break;
        case 'ETC-USDT':
          stores.settings.setEtcData(res?.data.data);
          break;
        case 'FIL-USDT':
          stores.settings.setFilData(res?.data.data);
          break;
        case 'LINK-USDT':
          stores.settings.setLinkData(res?.data.data);
          break;
        case 'LTC-USDT':
          stores.settings.setLtcData(res?.data.data);
          break;
        case 'TRX-USDT':
          stores.settings.setTrxData(res?.data.data);
          break;
        case 'XRP-USDT':
          stores.settings.setXrpData(res?.data.data);
          break;
      }
    },
    onError: (err) => {
      console.log('onError: useFetchHistoryData');
      console.log(err);
    },
  });

export {
  requestActions,
  getRequestAction,
  postRequestAction,
  useVerifyOtp,
  useFetchHistoryData,
  socket,
};
