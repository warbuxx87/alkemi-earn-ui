import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Box } from "@mui/material";

export default function LiquidationChart({ borrowList }) {
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
            labels: [],
        },
        series: [],
        type: "donut",
        width: "100%",
        height: 55,
    });

    // format data for display (could be moved to container)
    useEffect(() => {
        let newLabels = [];
        let newSeries = [];
        borrowList.forEach((borrow) => {
            newLabels.push(borrow.symbol);
            newSeries.push(parseFloat(borrow.valueETH));
        });

        setChartProps({
            ...chartProps,
            series: newSeries,
            options: { ...chartProps.options, labels: newLabels },
        });

        // TODO: remove the next line and replace it with a proper management
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [borrowList]);

    return (
        <Box width={80} pr={1}>
            <Chart {...chartProps} />
        </Box>
    );
}
