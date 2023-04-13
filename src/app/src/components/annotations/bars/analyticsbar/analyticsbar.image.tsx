import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


interface AnalyticsImageBarProps {
  tagImageCounts: Record<string, number>;
  tagImageColours: Record<string, string>;
}

const AnalyticsImageBar = (props: AnalyticsImageBarProps): JSX.Element => {
  const tagColours = Object.entries(props.tagImageCounts).map(([x, y]) => props.tagImageColours[x]);
  const tagCount = [
    {
      data: Object.entries(props.tagImageCounts).map(([x, y]) => ({ x, y })),
    },
  ]

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    title: {
      text: "Occurances Of Objects",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: 600,
      },
    },
    theme: {
      mode: "dark",
    },
    colors: tagColours,
    tooltip: {
      y: {
        formatter: function(val) {
          return val + " occurances"
        }
      }
    },
    plotOptions: {
      bar: {
        distributed: true, // this line is mandatory
        horizontal: false,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      labels: {
        show: true,
      }
    },
    yaxis: {
      title: {
        text: "Occurances",
      },
    },
  };

  return (
    <Chart
      type="bar"
      width={1000}
      height="90%"
      options={options}
      series={tagCount}
    />
  );
}

export default AnalyticsImageBar;
