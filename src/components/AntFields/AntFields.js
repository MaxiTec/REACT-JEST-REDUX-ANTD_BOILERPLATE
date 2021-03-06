import React from 'react';
import {
  DatePicker, Form, Input, TimePicker, Select, Checkbox,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = AntComponent => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) => {
    console.log(field.name, value);
    form.setFieldValue(field.name, value);
  };
  const onChange = value => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <FormItem
        label={label}
        hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? 'error' : 'success'}
      >
        {type == 'password' ? (
          <AntComponent.Password
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={type ? onInputChange : onChange}
          >
            {selectOptions && selectOptions.map(name => <Option key={name}>{name}</Option>)}
          </AntComponent.Password>
        ) : (
          <AntComponent
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={type ? onInputChange : onChange}
          >
            {selectOptions && selectOptions.map(name => <Option key={name}>{name}</Option>)}
          </AntComponent>
        )}
      </FormItem>
    </div>
  );
};
const CreateCheckBox = AntComponent => ({
  field,
  form,
  hasFeedback,
  label,
  submitCount,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { checked } }) => {
    console.log(checked);
    form.setFieldValue(field.name, checked);
  };
  return (
    <div className="field-container">
      <FormItem
        hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
        help={submittedError || touchedError ? hasError : false}
      >
        <AntComponent {...field} {...props} onChange={onInputChange} />
      </FormItem>
    </div>
  );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntCheckBox = CreateCheckBox(Checkbox);
