import React from 'react';
import { Form, Field } from 'formik';
// import css from './Login.styl';
import { AntInput } from '../AntFields/AntFields';

export default ({
  handleSubmit, values, submitCount, isSubmitting,
}) => (
  // console.log(`es aca ${isSubmitting}`);
  <Form className="form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name="username"
      type="text"
      label="Usuario"
      //   validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntInput}
      name="password"
      type="password"
      label="Contraseña"
      //   validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    {/* <Field
        component={AntDatePicker}
        name="bookingDate"
        label="Booking Date"
        defaultValue={values.bookingDate}
        format={dateFormat}
        //   validate={validateDate}
        submitCount={submitCount}
        hasFeedback
      /> */}
    {/* <Field
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
      /> */}
    {/* <Field
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
        component={AntSelect}
        mode="tags"
        name="bookingClient2"
        label="Client 2"
        defaultValue={values.bookingClient2}
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
      /> */}
    <div className="submit-container">
      <button className="ant-btn ant-btn-primary" type="submit">
        Submit
      </button>
      {/* <button className={`ant-btn ${css['ant-btn-secondary']}`}>Prueba</button> */}
      {/* <Button type="primary" disabled={isSubmitting}>Primary</Button> */}
    </div>
  </Form>
);
