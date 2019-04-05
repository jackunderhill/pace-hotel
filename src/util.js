import { ENDPOINT } from "./constants";

export const fetchOccupancy = async () => {
  try {
    const res = await fetch(`${ENDPOINT}occupancy-curve`);
    if (res.status !== 200) throw new Error("Fetch occupancy failed");
    return await res.json();
  } catch (e) {
    throw e;
  }
};

export const fetchPrice = async () => {
  try {
    const res = await fetch(`${ENDPOINT}price`);
    if (res.status !== 200) throw new Error("Fetch price failed");
    const data = await res.json();
    return data.data;
  } catch (e) {
    throw e;
  }
};

export const createXYArray = data => {
  return data.data.occupancy.reduce((acc, currentVal, currentIndex) => {
    acc.push({ x: data.x_axis[currentIndex], y: parseInt(currentVal, 10) });
    return acc;
  }, []);
};

export const getTickValues = points => {
  const dates = points.map(({ x }) => x);
  return dates.filter(
    d => d.split("-")[2] === "01" || d.split("-")[2] === "15"
  );
};

export const handleSubmitPrice = (
  currentValue,
  formValue,
  setPrice,
  setFormError
) => async e => {
  e.preventDefault();
  if (formValue < 0.01)
    return setFormError("Please enter a value greater than 0");

  const res = await fetch(`${ENDPOINT}price`, {
    method: "POST",
    body: JSON.stringify({ new_price: formValue }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (res.status === 200) {
    setPrice({ ...currentValue, price: formValue });
    setFormError(null);
  } else {
    setFormError("Sorry, something has gone wrong, please try again later.");
  }
};
