import React from "react";
import { XYPlot, LineSeries, XAxis, YAxis } from "react-vis";

export default ({ data, XTicks, XTitle, YTitle }) => (
  <XYPlot width={600} height={300} xType="ordinal">
    <XAxis title={XTitle} orientation="bottom" tickValues={XTicks} />
    <YAxis title={YTitle} />
    <LineSeries
      curve="curveBasis"
      data={data}
      opacity={1}
      strokeStyle="solid"
      style={{}}
    />
  </XYPlot>
);
