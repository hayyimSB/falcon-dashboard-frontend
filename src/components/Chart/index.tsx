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

HC_exporting(Highcharts);
HC_accessibility(Highcharts);
HC_candleStick(Highcharts);
// StockTools(Highcharts);
// Indicators(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
DragPanes(Highcharts);

interface PropsData {
  title: string;
  data: any;
  liveData: any;
  socket: any;
  lg?: boolean;
}

const Chart: FC<PropsData> = observer((props) => {
  const classes = styles();
  const { title, data, liveData, socket, lg } = props;
  const chartComponent = useRef(null);
  const [indicatorVisible, setIndicatorVisible] = useState<boolean>(false);
  const [isSec, setIsSec] = useState<boolean>(true);

  useEffect(() => console.log(mockUp), []);

  let candleOptions = {
    // rangeSelector: {
    //   selected: 1,
    // },
    title: {
      text: title,
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
          chartComponent.current?.chart.showLoading('Loading...');
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
          // setInterval(() => {
          //   const time = new Date().getTime(),
          //     spread = Math.round(Math.random() * 1000),
          //     spread_ratio = Math.round(Math.random() * 1000),
          //     far_bid = Math.round(Math.random() * 1000),
          //     near_ask = Math.round(Math.random() * 1000);
          //   series.addPoint(
          //     { time, spread, spread_ratio, far_bid, near_ask },
          //     true,
          //     true
          //   );
          // }, 1000);
        },
      },
    },
    title: {
      text: title,
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
    navigator: {
      height: 25,
    },
    rangeSelector: {
      // allButtonsEnabled: true,
      // inputEnabled: false,
      buttons: [
        {
          type: 'minute',
          count: 1,
          text: '1s',
          events: {
            click: () => {
              changeInterval(1);
              setIsSec(true);
            },
          },
        },
        {
          type: 'minute',
          count: 1,
          text: '1m',
          events: {
            click: () => {
              changeInterval(60);
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 5,
          text: '5m',
          events: {
            click: () => {
              changeInterval(300);
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 15,
          text: '15m',
          events: {
            click: () => {
              changeInterval(900);
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 1,
          text: '1h',
          events: {
            click: () => {
              changeInterval(3600);
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 4,
          text: '4h',
          events: {
            click: () => {
              changeInterval(14400);
              setIsSec(false);
            },
          },
        },
        {
          type: 'minute',
          count: 1,
          text: '1d',
          events: {
            click: () => {
              changeInterval(86400);
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
          text: '',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        // labels: {
        //   align: 'right',
        //   x: -3,
        // },
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
      formatter: function () {
        return (
          'Open: ' +
          this.points[0].point.options?.y +
          '<br />' +
          'High: ' +
          this.points[0].point.options?.far_bid +
          '<br />' +
          'Low: ' +
          this.points[0].point.options?.far_bid +
          '<br />' +
          'Close: ' +
          this.points[0].point.options?.far_bid +
          '<br />' +
          '스프레드: ' +
          this.points[0].point.options?.y +
          '<br />' +
          '스프레드 비율: ' +
          this.points[0].point.options?.spread_ratio +
          '<br />' +
          '차분기물 가격: ' +
          this.points[0].point.options?.far_bid +
          '<br />' +
          '당분기물 가격: ' +
          this.points[0].point.options?.near_ask
        );
      },
    },
    stockTools: {
      gui: {
        enabled: true,
      },
    },
    series: [
      {
        data: (function () {
          var data = [],
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
      // {
      //   type: 'column',
      //   data: (function () {
      //     var columnData = [];
      //     for (var i = 0; i < mockUp.length; i++) {
      //       columnData.push([
      //         mockUp[i][0], // the date
      //         Math.round(Math.random() * 100), // the volume
      //       ]);
      //     }
      //     return columnData;
      //   })(),
      //   yAxis: 1,
      // },
    ],
    // responsive: {
    //   rules: [
    //     {
    //       condition: {
    //         maxWidth: 800,
    //       },
    //       chartOptions: {
    //         rangeSelector: {
    //           inputEnabled: false,
    //         },
    //       },
    //     },
    //   ],
    // },
  };

  const changeInterval = (interval: number) => {
    if (socket.readyState === 2 || socket.readyState === 3) {
      toast.error('소켓서버와의 통신이 불가합니다.');
      return;
    }
    if (socket.readyState === 1) {
      socket.send(JSON.stringify({ ...liveData, interval }));
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const res = await fetch(
  //       'https://demo-live-data.highcharts.com/time-rows.json'
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     options.series[0].data = mockData;
  //     const [date, value] = data[0];
  //     const point = [new Date(date).getTime(), value];
  //     if (chartComponent.current) {
  //       chartComponent.current.chart.series[0].addPoint(point, true);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

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
