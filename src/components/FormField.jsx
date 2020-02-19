import React from 'react';
import { Form } from 'antd';

export const FormField = ({ content, form, withValidation, fieldName, value }) => {
  const config = {
    rules: [{
      required: true,
      message: 'This field is required!'
    }],
    initialValue: value
  };
  return (
    <Form.Item className="mb-0">
      {
        withValidation ?
          form.getFieldDecorator(fieldName, config)(content) :
          content
      }
    </Form.Item>
  )
}