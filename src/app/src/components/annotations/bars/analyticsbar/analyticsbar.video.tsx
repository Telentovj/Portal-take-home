import React from "react";
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface AnalyticsVideoBarProps {
  tagVideoCounts: Record<string, Record<string, number>>;
  tagVideoColours: Record<string, string>;
  jumpToTimeStamp: Function
}

const AnalyticsVideoBar = (props: AnalyticsVideoBarProps): JSX.Element => {
  /*
  Potential Improvement
  Need to account for when the tooltip gets too long. 
  Probably need to make some kind of custom tooltips not just display in a column but 
  rather like a box, or make it scrollable.
  Do not just allow overflow because there is 
  always an upper limit to how long it can be.
  */
  const timeIntervals = Object.entries(props.tagVideoCounts).map(([x, y]) => x);

  const tagCounts = Object.keys(props.tagVideoColours).map((tagName) => {
    const counts = timeIntervals.map((interval) => {
      return props.tagVideoCounts[interval][tagName] || 0;
    });
    return {
      name: tagName,
      data: counts,
    };
  });

  const tagColors = tagCounts.map((tag) => {
    return props.tagVideoColours[tag.name];
  });

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      background: 'transparent',
      events: {
        click: function (event, chartContext, config) {
          // gets the position of the marker in the series
          const dp = config.dataPointIndex
          props.jumpToTimeStamp(parseInt(timeIntervals[dp]) / 1000);
        }
      }
    },
    title: {
      text: "Occurances Of Objects Over Time",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: 600,
      },
    },
    theme: {
      mode: "dark",
    },
    colors: tagColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2, 2],
      curve: 'straight',
    },
    tooltip: {
      followCursor: true,
      y: {
        formatter: function (val) {
          return val + " occurances";
        }
      },
      x: {
        formatter: function (val) {
          return (parseInt(timeIntervals[val - 1]) / 1000).toFixed(3) + " Seconds"
        }
      }
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: timeIntervals,
      labels: {
        show: false,
      }
    },
    yaxis: {
      title: {
        text: 'Occurances',
        style: {
          fontSize: '13px',
        },
      },
    },
  };

  const series = tagCounts;

  return (
    <Chart
      height="90%"
      width={1000}
      options={options}
      series={series}
      type="line"
    />
  );
};

export default AnalyticsVideoBar;
