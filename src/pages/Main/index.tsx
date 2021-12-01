import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import moment from 'moment';
import timeZone from 'moment-timezone';
// import { PageTitle, Coin } from 'utils/text';
import Header from 'components/Header';
import Chart from 'components/Chart';
import { useStores } from 'hooks/useStores';
import { Pair } from 'utils/text';
import {
  requestActions,
  getRequestAction,
} from 'apis/hooks/mutation/useRequest';

const MainPage: FC = observer(() => {
  const { settings } = useStores();
  // useMount(() => {
  //   socket.onopen = () => {
  //     console.log('connected');
  //     socket.send(JSON.stringify({ pair: 'BCH-USDT', interval: 'sec' }));
  //     // socket.send(JSON.stringify({ pair: 'BTC-USDT', interval: 'sec' }));
  //   };
  //   socket.onmessage = (evt) => {
  //     console.log(evt.data, typeof evt.data);
  //     console.log(JSON.parse(evt.data));
  //     settings.setBchUsdtData(JSON.parse(evt.data));
  //     // console.log(JSON.parse(evt));
  //     // JSON.parse(evt.data);
  //   };
  // });

  // const fetchHistory = (pair: string, time: string, num: number) => {
  //   timeZone.tz.setDefault('Etc/UTC');
  //   const requestAction = requestActions.FETCH_HISTORY_DATA(pair);
  //   const now = Date.now();
  //   let before;
  //   if (time === 'sec') {
  //     before = now - num * 900 * 1000;
  //   } else if (time === 'min') {
  //     before = now - num * 60 * 900 * 1000;
  //   } else if (time === 'hour') {
  //     before = now - num * 3600 * 900 * 1000;
  //   } else {
  //     //day
  //     before = now - num * 86400 * 900 * 1000;
  //   }
  //   return getRequestAction(
  //     { ...requestAction },
  //     {
  //       start: moment(before).format('YYYY-MM-DD HH:mm:ss'),
  //       end: moment(now).format('YYYY-MM-DD HH:mm:ss'),
  //     }
  //   );
  // };

  const fetchHistory = (pair: string, time: number) => {
    timeZone.tz.setDefault('Etc/UTC');
    const requestAction = requestActions.FETCH_HISTORY_DATA(pair);
    const now = Date.now();
    let before = now - time * 900 * 1000;
    // return getRequestAction(
    //   { ...requestAction },
    //   {
    //     start: moment(before).format('YYYY-MM-DD HH:mm:ss'),
    //     end: moment(now).format('YYYY-MM-DD HH:mm:ss'),
    //   }
    // );
    return {
      start: moment(before).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(now).format('YYYY-MM-DD HH:mm:ss'),
    };
  };

  // const adaSocket = new WebSocket('ws://10.21.101.108:4041');
  // const bchSocket = new WebSocket('ws://10.21.101.108:4041');
  // const bsvSocket = new WebSocket('ws://10.21.101.108:4041');
  // const btcSocket = new WebSocket('ws://10.21.101.108:4041');
  // const dotSocket = new WebSocket('ws://10.21.101.108:4041');
  // const eosSocket = new WebSocket('ws://10.21.101.108:4041');
  // const etcSocket = new WebSocket('ws://10.21.101.108:4041');
  // const ethSocket = new WebSocket('ws://10.21.101.108:4041');
  // const filSocket = new WebSocket('ws://10.21.101.108:4041');
  // const linkSocket = new WebSocket('ws://10.21.101.108:4041');
  // const ltcSocket = new WebSocket('ws://10.21.101.108:4041');
  // const trxSocket = new WebSocket('ws://10.21.101.108:4041');
  // const xrpSocket = new WebSocket('ws://10.21.101.108:4041');
  const adaSocket = new WebSocket('ws://localhost:4041');
  const bchSocket = new WebSocket('ws://localhost:4041');
  const bsvSocket = new WebSocket('ws://localhost:4041');
  const btcSocket = new WebSocket('ws://localhost:4041');
  const dotSocket = new WebSocket('ws://localhost:4041');
  const eosSocket = new WebSocket('ws://localhost:4041');
  const etcSocket = new WebSocket('ws://localhost:4041');
  const ethSocket = new WebSocket('ws://localhost:4041');
  const filSocket = new WebSocket('ws://localhost:4041');
  const linkSocket = new WebSocket('ws://localhost:4041');
  const ltcSocket = new WebSocket('ws://localhost:4041');
  const trxSocket = new WebSocket('ws://localhost:4041');
  const xrpSocket = new WebSocket('ws://localhost:4041');

  return (
    <Box>
      {/* <Header title={PageTitle.FALCON_DASHBOARD} /> */}
      <Grid container spacing={1} sx={{ px: 3 }}>
        <Chart
          pair={Pair.BTC_USDT}
          data={settings.btcData}
          socket={btcSocket}
          liveData={{ pair: Pair.BTC_USDT, interval: 1 }}
          lg={true}
          fetchHistory={fetchHistory}
        />
        {/* <Chart
          pair={Pair.ETH_USDT}
          data={settings.ethData}
          socket={ethSocket}
          liveData={{ pair: Pair.ETH_USDT, interval: 1 }}
          lg={true}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.ADA_USDT}
          data={settings.adaData}
          socket={adaSocket}
          liveData={{ pair: Pair.ADA_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.BCH_USDT}
          data={settings.bchData}
          socket={bchSocket}
          liveData={{ pair: Pair.BCH_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.BSV_USDT}
          data={settings.bsvData}
          socket={bsvSocket}
          liveData={{ pair: Pair.BSV_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.DOT_USDT}
          data={settings.dotData}
          socket={dotSocket}
          liveData={{ pair: Pair.DOT_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.EOS_USDT}
          data={settings.eosData}
          socket={eosSocket}
          liveData={{ pair: Pair.EOS_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.ETC_USDT}
          data={settings.etcData}
          socket={etcSocket}
          liveData={{ pair: Pair.ETC_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.FIL_USDT}
          data={settings.filData}
          socket={filSocket}
          liveData={{ pair: Pair.FIL_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.LINK_USDT}
          data={settings.linkData}
          socket={linkSocket}
          liveData={{ pair: Pair.LINK_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.LTC_USDT}
          data={settings.ltcData}
          socket={ltcSocket}
          liveData={{ pair: Pair.LTC_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.TRX_USDT}
          data={settings.trxData}
          socket={trxSocket}
          liveData={{ pair: Pair.TRX_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        />
        <Chart
          pair={Pair.XRP_USDT}
          data={settings.xrpData}
          socket={xrpSocket}
          liveData={{ pair: Pair.XRP_USDT, interval: 1 }}
          fetchHistory={fetchHistory}
        /> */}
      </Grid>
    </Box>
  );
});

export default MainPage;
