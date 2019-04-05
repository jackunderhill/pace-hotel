import React, { useState, useEffect } from "react";
import { Typography } from "antd";

import "antd/dist/antd.css";
import "react-vis/dist/style.css";
import Loader from "./components/Loader";
import SingleInputForm from "./components/SingleInputForm";
import Graph from "./components/Graph";
import {
  fetchPrice,
  fetchOccupancy,
  createXYArray,
  getTickValues,
  handleSubmitPrice
} from "./util";
import Container from "./components/Container";

const { Title } = Typography;

const App = ({ initOccupancyState, initPriceState }) => {
  const [occupancy, setOccupancy] = useState(initOccupancyState || null);
  const [price, setPrice] = useState(initPriceState || null);

  const [occupancyTicks, setOccupancyTicks] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formValue, setFormValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const occupancyData = await fetchOccupancy();
      setOccupancy(createXYArray(occupancyData));

      const priceData = await fetchPrice();
      setPrice(priceData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    occupancy && setOccupancyTicks(getTickValues(occupancy));
  }, [occupancy]);

  return (
    <Container>
      <Title>Your Hotel Dashboard</Title>

      {price ? (
        <Title level={3}>
          Current Price: {price.currency_symbol}
          {price.price}
        </Title>
      ) : (
        <Loader />
      )}

      <Title level={2}>Update This Price</Title>
      <SingleInputForm
        handleSubmit={handleSubmitPrice(
          price,
          formValue,
          setPrice,
          setFormError
        )}
        btnText="Update Price"
        label="New price"
        {...{
          formValue,
          formError,
          setFormValue
        }}
      />

      {occupancy ? (
        <>
          <Title level={2}>Room Occupancy</Title>
          <Graph
            data={occupancy}
            XTicks={occupancyTicks}
            XTitle="Date"
            YTitle="Occupancy (%)"
          />
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default App;
