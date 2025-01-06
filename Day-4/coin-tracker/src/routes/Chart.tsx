import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";

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

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) || [], // Convert strings to numbers
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
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              categories: data?.map((date) => {
                const time = new Date(date.time_close * 1000);
                return time.toLocaleDateString();
              }),
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#E1FFBB"],
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed()}`,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
