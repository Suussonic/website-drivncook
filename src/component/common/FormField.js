import React from 'react';

const FormField = ({ label, type = 'text', value, onChange, ...props }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input className="input" type={type} value={value} onChange={onChange} {...props} />
    </div>
  </div>
);

export default FormField;
