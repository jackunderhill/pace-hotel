import React from "react";
import { render } from "react-testing-library";
import Graph from "../components/Graph";

const data = [
  { x: "One", y: 10 },
  { x: "Two", y: 8 },
  { x: "Three", y: 6 },
  { x: "Four", y: 4 },
  { x: "Five", y: 2 }
];

const XTicks = ["One", "Three", "Five"];

describe("Graph", () => {
  test("Should render XTicks", () => {
    const { getByText, queryByText } = render(
      <Graph data={data} XTicks={XTicks} XTitle="X title" YTitle="Y title" />
    );

    XTicks.forEach(val => {
      getByText(val.toString());
    });

    expect(queryByText(data[1].x)).toBeNull();
  });

  test("Should render points", () => {
    const { getByText } = render(
      <Graph data={data} XTicks={XTicks} XTitle="X title" YTitle="Y title" />
    );

    data.forEach(({ y }) => {
      getByText(y.toString());
    });
  });

  test("Should render titles", () => {
    const { getByText } = render(
      <Graph data={data} XTicks={XTicks} XTitle="X title" YTitle="Y title" />
    );

    getByText("X title");
    getByText("Y title");
  });
});
