import React from 'react';
import { Form, Field } from 'formik';
import {
  AntDatePicker,
  AntInput,
  AntSelect,
  AntTimePicker,
  AntCheckBox,
} from '../AntFields/AntFields';

const dateFormat = 'MM-DD-YYYY';
const timeFormat = 'h:mm A';

export default ({ handleSubmit, values, submitCount }) => (
  <Form className="form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name="email"
      type="email"
      label="Email"
      //   validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntDatePicker}
      name="bookingDate"
      label="Booking Date"
      defaultValue={values.bookingDate}
      format={dateFormat}
      //   validate={validateDate}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntTimePicker}
      name="bookingTime"
      label="Booking Time"
      defaultValue={values.bookingTime}
      format={timeFormat}
      hourStep={1}
      minuteStep={5}
      //   validate={isRequired}
      submitCount={submitCount}
      hasFeedback
      use12Hours
    />
    <Field
      component={AntSelect}
      name="bookingClient"
      label="Client"
      defaultValue={values.bookingClient}
      selectOptions={values.selectOptions}
      //   validate={isRequired}
      submitCount={submitCount}
      tokenSeparators={[',']}
      style={{ width: 200 }}
      hasFeedback
    />
    <Field
      component={AntCheckBox}
      name="checkboxName"
      defaultValue={values.checkboxName}
      submitCount={submitCount}
      style={{ width: 200 }}
      hasFeedback
    />
    <div className="submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Submit
      </button>
    </div>
  </Form>
);
