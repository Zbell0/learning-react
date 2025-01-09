import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";
import { string } from "prop-types";

const Overview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 10px;
  border-radius: 10px;
  text-align: center;
`;

const OverviewItem = styled.div<{ isPositive?: boolean; isNegative?: boolean }>`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span:last-child {
    font-size: 50px;
    color: ${(props) =>
      props.isPositive ? "#4DA1A9" : props.isNegative ? "#9F5255" : "gray"};
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isPositive?: boolean; isNegative?: boolean }>`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
  }
  p {
    font-size: 50px;
    margin: 10px 0px 10px 0px;
    color: ${(props) =>
      props.isPositive ? "#4DA1A9" : props.isNegative ? "#9F5255" : "gray"};
  }
`;

interface priceProp {
  coinId: string;
}

interface ITickerHistory {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: priceProp) {
  const { isLoading, data } = useQuery<ITickerHistory>(
    ["pricetab", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const getTabStyle = (value: number) => {
    return {
      isPositive: value > 0,
      isNegative: value < 0,
    };
  };

  return (
    <div>
      {isLoading ? (
        "Price loading.."
      ) : (
        <>
          <Overview>
            <OverviewItem
              {...getTabStyle(
                Number(data?.quotes.USD.percent_from_price_ath?.toFixed(2)) || 0
              )}
            >
              <span>
                All time high price : $ {data?.quotes.USD.ath_price.toFixed(2)}
                <br />
                <p>Percentage difference from ath</p>
              </span>
              <span>{data?.quotes.USD.percent_from_price_ath}%</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab {...getTabStyle(data?.quotes.USD.percent_change_30m || 0)}>
              <span>
                Difference from 30min ago:
                <br />
              </span>
              <p>{data?.quotes.USD.percent_change_30m}%</p>
            </Tab>
            <Tab {...getTabStyle(data?.quotes.USD.percent_change_1h || 0)}>
              <span>
                Difference from an hour ago:
                <br />
              </span>
              <p>{data?.quotes.USD.percent_change_1h}%</p>
            </Tab>
            <Tab {...getTabStyle(data?.quotes.USD.percent_change_24h || 0)}>
              <span>
                Difference from a day ago:
                <br />
              </span>
              <p>{data?.quotes.USD.percent_change_24h}%</p>
            </Tab>
            <Tab {...getTabStyle(data?.quotes.USD.percent_change_7d || 0)}>
              <span>
                Difference from 7 days ago:
                <br />
              </span>
              <p>{data?.quotes.USD.percent_change_7d}%</p>
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default Price;
