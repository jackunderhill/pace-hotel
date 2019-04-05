import React from "react";
import { render } from "react-testing-library";

import App from "../App";

const props = {
  initOccupancyState: [{ x: "a", y: 1 }, { x: "b", y: 2 }, { x: "c", y: 3 }],
  initPriceState: { price: "100.00", currency_symbol: "£" }
};

describe("App", () => {
  test("Should render price", () => {
    const { getByText } = render(<App {...props} />);
    getByText("Current Price: £100.00");
  });

  test("Should render graph", () => {
    const { getByText } = render(<App {...props} />);
    getByText("Occupancy (%)");
  });

  test("Should render form", () => {
    const { getByText } = render(<App {...props} />);
    getByText("Update Price");
  });
});
