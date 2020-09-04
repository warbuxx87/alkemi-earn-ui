import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Box } from "@material-ui/core";

export default function App(props) {
    const [chartProps, setChartProps] = useState({
        options: {
            tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
                shared: true,
                followCursor: true,
                fillSeriesColor: false,
                theme: true,
                style: {
                    fontSize: "12px",
                    fontFamily: undefined,
                },
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                y: {
                    formatter: undefined,
                    title: {
                        formatter: (seriesName) => seriesName,
                    },
                },
                marker: {
                    show: true,
                },
            },
            chart: {
                animations: {
                    enabled: false,
                },
                type: "donut",
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: "75%",
                    },
                    expandOnClick: false,
                },
                radialBar: {
                    hollow: {
                        size: "100%",
                    },
                },
            },
            stroke: {
                show: false,
            },
            labels: ["DAI", "WETH", "USDC"],
        },
        series: [1634, 3743, 2744],
        type: "donut",
        width: "100%",
        height: 60,
    });

    return (
        <Box width={80} pr={1}>
            <Chart {...chartProps} />
        </Box>
    );
}
