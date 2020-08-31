import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { Box, useTheme } from '@material-ui/core';

function Chart({ data: dataProp, ...rest }) {
  const theme = useTheme();

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["DAI", "USDC", "WETH"],
    datasets: [
      {
        data: [57.74, 16, 26.26],
        backgroundColor: ["#fac34a", "#4088fa", "#00e1a2"],
        borderRadius: "16px",
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.dark,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        label(tooltipItem, _data) {
          const label = _data.labels[tooltipItem.index];
          const value = _data.datasets[0].data[tooltipItem.index];

          return `${label}: ${value}%`;
        }
      }
    }
  };

  return (
    <Box width={50} height={50}>
    <Doughnut
      data={data}
      options={options}
      {...rest}
    />
    </Box>
  );
}

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default Chart;
