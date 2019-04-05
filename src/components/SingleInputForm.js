import React from "react";
import { Form, Input, Button } from "antd";

const SingleInputForm = ({
  formValue,
  formError,
  setFormValue,
  handleSubmit,
  btnText,
  label
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label={label}>
        <Input
          type="number"
          value={formValue}
          onInput={e => setFormValue(e.target.value)}
        />
      </Form.Item>
      {formError}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {btnText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SingleInputForm;
