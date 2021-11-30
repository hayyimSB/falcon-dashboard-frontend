import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
// import { PageTitle, Coin } from 'utils/text';
import Header from 'components/Header';
import Chart from 'components/Chart';
import { useStores } from 'hooks/useStores';
import { Coin } from 'utils/text';

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
          title={Coin.BTC_USDT}
          data={settings.btcData}
          socket={btcSocket}
          liveData={{ pair: 'BTC-USDT', interval: 1 }}
          lg={true}
        />
        {/* <Chart
          title={Coin.ETH_USDT}
          data={settings.ethData}
          socket={ethSocket}
          liveData={{ pair: 'ETH-USDT', interval: 1 }}
          lg={true}
        />
        <Chart
          title={Coin.ADA_USDT}
          data={settings.adaData}
          socket={adaSocket}
          liveData={{ pair: 'ADA-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.BCH_USDT}
          data={settings.bchData}
          socket={bchSocket}
          liveData={{ pair: 'BCH-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.BSV_USDT}
          data={settings.bsvData}
          socket={bsvSocket}
          liveData={{ pair: 'BSV-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.DOT_USDT}
          data={settings.dotData}
          socket={dotSocket}
          liveData={{ pair: 'DOT-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.EOS_USDT}
          data={settings.eosData}
          socket={eosSocket}
          liveData={{ pair: 'EOS-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.ETC_USDT}
          data={settings.etcData}
          socket={etcSocket}
          liveData={{ pair: 'ETC-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.FIL_USDT}
          data={settings.filData}
          socket={filSocket}
          liveData={{ pair: 'FIL-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.LINK_USDT}
          data={settings.linkData}
          socket={linkSocket}
          liveData={{ pair: 'LINK-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.LTC_USDT}
          data={settings.ltcData}
          socket={ltcSocket}
          liveData={{ pair: 'LTC-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.TRX_USDT}
          data={settings.trxData}
          socket={trxSocket}
          liveData={{ pair: 'TRX-USDT', interval: 1 }}
        />
        <Chart
          title={Coin.XRP_USDT}
          data={settings.xrpData}
          socket={xrpSocket}
          liveData={{ pair: 'XRP-USDT', interval: 1 }}
        /> */}
      </Grid>
    </Box>
  );
});

export default MainPage;
