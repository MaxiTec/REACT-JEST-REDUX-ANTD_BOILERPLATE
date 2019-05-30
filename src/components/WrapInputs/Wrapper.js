import React from 'react';
import css from './index.styl';

const FormGroup = ({ label, ...props }) => (
  <div className={css.form__group}>
    <div className={css.form__group__label}>{label}</div>
    {props.children}
  </div>
);

export default FormGroup;
