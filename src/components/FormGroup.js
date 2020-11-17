import React from 'react';
import '../styles/index.css';

const FormGroup = ({
  errors,
  touched,
  type,
  handleChange,
  handleBlur,
  values,
  name,
  label,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    {type === 'date' ? (
      <input
        id={name}
        type="date"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        className={
          errors[name] && touched[name]
            ? 'border_red'
            : 'text-input'
        }
      />
    ) : (
      <input
      id={name}
        type={type}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        className={
          errors[name] && touched[name] ? 'text-input error' : 'text-input'
        }
      />
    )}
    {errors[name] && touched[name] && (
      <div className="input-feedback">{errors[name]}</div>
    )}
  </div>
);

export default FormGroup;
