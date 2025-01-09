import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";
import Price from "./Price";

interface chartProp {
  coinId: string;
}

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: chartProp) {
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const seriesData =
    data?.map((data) => ({
      x: new Date(data.time_open * 1000),
      y: [
        parseFloat(data.open),
        parseFloat(data.high),
        parseFloat(data.low),
        parseFloat(data.close),
      ],
    })) || [];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: seriesData,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: true,
              borderColor: "grey",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              labels: {
                formatter: (value) => {
                  const date = new Date(value);
                  return date
                    .toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })
                    .replace(",", "");
                },
              },
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: false,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#4DA1A9",
                  downward: "#9F5255",
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
