import {
  fetchOccupancy,
  fetchPrice,
  createXYArray,
  getTickValues
} from "../util";

const XYValues = [
  {
    x: "2019-01-01",
    y: 0
  },
  {
    x: "2019-01-02",
    y: 1
  },
  {
    x: "2019-03-15",
    y: 8
  }
];

describe("Util", () => {
  const legitFetch = window.fetch;

  afterEach(() => {
    window.fetch = legitFetch;
  });

  test("fetchOccupancy", async () => {
    window.fetch = jest.fn(() => ({
      status: 200,
      json: jest.fn(() => "success")
    }));
    const successRes = await fetchOccupancy();
    expect(successRes).toEqual("success");

    window.fetch = jest.fn(() => ({ status: 500 }));
    await expect(fetchOccupancy()).rejects.toThrowError(
      "Fetch occupancy failed"
    );
  });

  test("fetchPrice", async () => {
    window.fetch = jest.fn(() => ({
      status: 200,
      json: jest.fn(() => ({ data: "success" }))
    }));
    const successRes = await fetchPrice();
    expect(successRes).toEqual("success");

    window.fetch = jest.fn(() => ({ status: 500 }));
    await expect(fetchPrice()).rejects.toThrowError("Fetch price failed");
  });

  test("createXYArray", () => {
    const data = {
      x_axis: ["2019-01-01", "2019-01-02", "2019-03-15"],
      data: {
        occupancy: ["0", "1", "8"]
      }
    };

    expect(createXYArray(data)).toEqual(XYValues);
  });

  test("getTickValues", () => {
    expect(getTickValues(XYValues)).toEqual(["2019-01-01", "2019-03-15"]);
  });
});
