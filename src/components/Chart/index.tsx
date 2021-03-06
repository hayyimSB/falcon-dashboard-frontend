import React, { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { Box, Grid, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import Highcharts from 'highcharts/highstock';
import HC_exporting from 'highcharts/modules/exporting';
import HC_accessibility from 'highcharts/modules/accessibility';
import HC_candleStick from 'highcharts/modules/hollowcandlestick';
import HighchartsReact from 'highcharts-react-official';
import toast from 'react-hot-toast';
import styles from './styles';
// import Indicators from 'highcharts/indicators/indicators-all';
// import StockTools from 'highcharts/modules/stock-tools';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import DragPanes from 'highcharts/modules/drag-panes';
import { mockUp } from './MockUp/Mockup';
import { useStores } from 'hooks/useStores';
import useMount from 'hooks/useMount';
import { useFetchHistoryData } from 'apis/hooks/mutation/useRequest';

HC_exporting(Highcharts);
HC_accessibility(Highcharts);
HC_candleStick(Highcharts);
// StockTools(Highcharts);
// Indicators(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
DragPanes(Highcharts);

interface PropsData {
  pair: string;
  data: any;
  liveData: any;
  socket: any;
  lg?: boolean;
  fetchHistory?: (pair: string, time: number) => any;
}

const Chart: FC<PropsData> = observer((props) => {
  const { settings } = useStores();
  const classes = styles();
  const mutateFetchHistoryData = useFetchHistoryData();
  const { pair, data, liveData, socket, lg, fetchHistory } = props;
  const chartComponent = useRef(null);
  const [indicatorVisible, setIndicatorVisible] = useState<boolean>(false);
  const [isSec, setIsSec] = useState<boolean>(true);

  // useMount(async () => {
  //   await mutateFetchHistoryData.mutateAsync(fetchHistory(pair, 'sec', 1));
  //   if (settings.errorMessage?.data) {
  //     toast.error(settings.errorMessage?.data.message);
  //     settings.setErrorMessage({});
  //   }
  // });

  let candleOptions = {
    // rangeSelector: {
    //   selected: 1,
    // },
    title: {
      text: pair,
    },

    yAxis: [
      {
        title: {
          text: '',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: '',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
    ],
    tooltip: {
      split: true,
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['viewFullscreen'],
        },
        indicatorAll: {
          text: 'Indicator',
          onclick: () => {
            setIndicatorVisible(!indicatorVisible);
          },
        },
        a: {
          text: 'a',
          onclick: function () {
            alert('You pressed the button!');
          },
        },
        b: {
          text: 'b',
          onclick: function () {
            alert('You pressed another button!');
          },
        },
        c: {
          text: 'c',
          onclick: function () {
            alert('You pressed other button!');
          },
        },
      },
    },
    series: [
      {
        name: 'Spread',
        type: 'hollowcandlestick',
        data: (function () {
          var ohlcData = [];
          for (var i = 0; i < mockUp.length; i++) {
            ohlcData.push([
              mockUp[i][0], // the date
              mockUp[i][1], // open
              mockUp[i][2], // high
              mockUp[i][3], // low
              mockUp[i][4], // close
            ]);
          }
          return ohlcData;
        })(),
      },
      {
        name: 'Volume',
        type: 'column',
        data: (function () {
          var columnData = [];

          for (var i = 0; i < mockUp.length; i++) {
            columnData.push([
              mockUp[i][0], // the date
              Math.round(Math.random() * 100), // the volume
            ]);
          }
          return columnData;
        })(),
        yAxis: 1,
      },
    ],
  };

  const options = {
    chart: {
      height: 320,
      events: {
        load: function () {
          // chartComponent.current?.chart.showLoading('Loading...');
          const series = this.series[0];
          socket.onopen = () => {
            socket.send(JSON.stringify(liveData));
          };
          socket.onmessage = (evt) => {
            const x = JSON.parse(evt['data'])['x'] * 1000,
              y = JSON.parse(evt['data'])['y'],
              spread_ratio = JSON.parse(evt['data'])['spread_ratio'],
              far_bid = JSON.parse(evt['data'])['far_bid'],
              near_ask = JSON.parse(evt['data'])['near_ask'];
            // series.addPoint(JSON.parse(evt.data), true, true);
            series.addPoint(
              { x, y, spread_ratio, far_bid, near_ask },
              true,
              true
            );
          };
        },
      },
    },
    title: {
      text: pair,
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['viewFullscreen'],
        },
        indicatorAll: {
          text: 'All',
          onclick: () => {
            setIndicatorVisible(!indicatorVisible);
          },
        },
        bot1: {
          text: 'Bot 3',
          onclick: () => {
            alert('You pressed the button!');
          },
        },
        bot2: {
          text: 'Bot 2',
          onclick: () => {
            alert('You pressed another button!');
          },
        },
        bot3: {
          text: 'Bot 1',
          onclick: () => {
            alert('You pressed other button!');
          },
        },
      },
    },
    navigator: {
      height: 25,
    },
    rangeSelector: {
      allButtonsEnabled: true,
      inputEnabled: false,
      buttons: [
        {
          type: 'minute',
          count: 1,
          text: '1s',
          events: {
            click: async () => {
              changeInterval(1);
              await mutateFetchHistoryData.mutateAsync(fetchHistory(pair, 1));
              setIsSec(true);
            },
          },
        },
        {
          type: 'minute',
          count: 1,
          text: '1m',
          events: {
            click: async () => {
              changeInterval(60);
              await mutateFetchHistoryData.mutateAsync(fetchHistory(pair, 60));
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 5,
          text: '5m',
          events: {
            click: async () => {
              changeInterval(300);
              await mutateFetchHistoryData.mutateAsync(fetchHistory(pair, 300));
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 15,
          text: '15m',
          events: {
            click: async () => {
              changeInterval(900);
              await mutateFetchHistoryData.mutateAsync(fetchHistory(pair, 900));
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 1,
          text: '1h',
          events: {
            click: async () => {
              changeInterval(3600);
              await mutateFetchHistoryData.mutateAsync(
                fetchHistory(pair, 3600)
              );
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 4,
          text: '4h',
          events: {
            click: async () => {
              changeInterval(14400);
              await mutateFetchHistoryData.mutateAsync(
                fetchHistory(pair, 14400)
              );
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 1,
          text: '1d',
          events: {
            click: async () => {
              changeInterval(86400);
              await mutateFetchHistoryData.mutateAsync(
                fetchHistory(pair, 86400)
              );
              setIsSec(false);
            },
          },
        },
      ],
      selected: 0,
    },
    plotOptions: {
      series: {
        turboThreshold: 1000,
      },
      // area: {
      //   events: {
      //     legendItemClick: function (e) {
      //       toggleIndicators(this.chart);
      //       // if (this.name == 'Sigma Bands') {
      //       //   toggleBands(this.chart);
      //       // }
      //     },
      //   },
      // },
    },
    yAxis: [
      {
        title: {
          text: 'Spread',
        },
        //   height: '70%',
        //   lineWidth: 1,
        //   resize: {  ???????????? ??? ????????? ??? ?????? ??????
        //     enabled: true,
        //   },
      },
      {
        opposite: false,
        title: {
          text: 'Volume',
          // style: {
          //   color: 'blue',
          // },
        },
        labels: {
          align: 'left',
          x: -5,
          // format: '{value} mm',
          // style: {
          //   color: 'blue',
          // },
        },
      },
    ],
    tooltip: {
      formatter: function () {
        return (
          // 'Open: ' +
          // this.points[0].y +
          // '<br />' +
          // 'High: ' +
          // this.points[0].point.options?.far_bid +
          // '<br />' +
          // 'Low: ' +
          // this.points[0].point.options?.far_bid +
          // '<br />' +
          // 'Close: ' +
          // this.points[0].point.options?.far_bid +
          // '<br />' +
          '????????????: ' +
          this.points[0].y +
          '<br />' +
          '???????????? ??????: ' +
          this.points[0].point.options?.spread_ratio +
          '<br />' +
          '???????????? ??????: ' +
          this.points[0].point.options?.far_bid +
          '<br />' +
          '???????????? ??????: ' +
          this.points[0].point.options?.near_ask
          // this.points[1]?.y && '<br />' + 'Volume: ' + this.points[1]?.y
        );
      },
    },
    // stockTools: {
    //   gui: {
    //     enabled: true,
    //   },
    // },
    series: [
      {
        type: 'line',
        data: (function () {
          let data = [],
            time = new Date().getTime(),
            i;
          for (i = -999; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.round(Math.random() * 1000),
              spread_ratio: Math.round(Math.random() * 1000),
              far_bid: Math.round(Math.random() * 1000),
              near_ask: Math.round(Math.random() * 1000),
            });
          }
          return data;
        })(),
        // data,
        tooltip: {
          valueDecimals: 2,
        },
      },
      {
        type: 'column',
        color: 'red',
        data: (function () {
          const columnData = [];
          for (let i = -999; i <= 0; i += 1) {
            columnData.push([
              new Date().getTime(), // the date
              0.1, // the volume
            ]);
          }
          return columnData;
        })(),
        yAxis: 1,
      },
    ],
    // responsive: {
    //   rules: [
    //     {
    //       condition: {
    //         maxWidth: 500,
    //       },
    //       chartOptions: {
    //         legend: {
    //           floating: false,
    //           layout: 'horizontal',
    //           align: 'center',
    //           verticalAlign: 'bottom',
    //           x: 0,
    //           y: 0,
    //         },
    //         yAxis: [
    //           {
    //             labels: {
    //               align: 'right',
    //               x: 0,
    //               y: -6,
    //             },
    //             showLastLabel: false,
    //           },
    //           {
    //             labels: {
    //               align: 'left',
    //               x: 0,
    //               y: -6,
    //             },
    //             showLastLabel: false,
    //           },
    //           {
    //             visible: false,
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
  };

  const changeInterval = (interval: number) => {
    if (socket.readyState === 2 || socket.readyState === 3) {
      toast.error('?????????????????? ????????? ???????????????.');
      return;
    }
    if (socket.readyState === 1) {
      socket.send(JSON.stringify({ ...liveData, interval }));
    }
  };

  // options.yAxis[0].removePlotLine();
  // plotLines.push(
  //   Highcharts.yAxis[0].addPlotLine({
  //     value: 4.5,
  //     color: 'red',
  //     width: 2,
  //     id: 'first',
  //   })
  // );

  useEffect(() => {
    if (indicatorVisible) {
      chartComponent.current.chart.yAxis[0].addPlotLine({
        value: 200,
        color: 'green',
        width: 2,
        id: 'bot1-high',
      });
      chartComponent.current.chart.yAxis[0].addPlotLine({
        value: 175,
        color: 'red',
        width: 2,
        id: 'bot1-middle',
      });
      chartComponent.current.chart.yAxis[0].addPlotLine({
        value: 150,
        color: 'green',
        width: 2,
        id: 'bot1-low',
      });
    } else {
      chartComponent.current.chart.yAxis[0].removePlotLine('bot1-high');
      chartComponent.current.chart.yAxis[0].removePlotLine('bot1-middle');
      chartComponent.current.chart.yAxis[0].removePlotLine('bot1-low');
    }
  }, [indicatorVisible]);

  return (
    <Grid item md={lg ? 6 : 3}>
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={isSec ? options : candleOptions}
        // options={options}
      />
    </Grid>
  );
});

export default Chart;
