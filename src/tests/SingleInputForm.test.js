import React from "react";
import { render, fireEvent } from "react-testing-library";
import SingleInputForm from "../components/SingleInputForm";

const props = {
  btnText: "Btn",
  formValue: 0,
  formError: "Error",
  label: "New price",
  setFormValue: () => {}
};

describe("SingleInputForm", () => {
  test("Should submit user data", async () => {
    const handleSubmit = jest.fn(e => {
      e.preventDefault();
    });
    const { getByText } = render(
      <SingleInputForm {...props} handleSubmit={handleSubmit} />
    );

    getByText(props.formError);
    getByText(props.label);
    fireEvent.click(getByText(props.btnText).parentElement);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
