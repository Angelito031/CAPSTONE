import React from 'react';

const FormGroup = ({ children }) => (
  <div className="grid md:grid-cols-2 md:gap-6">
    {children}
  </div>
);

export default FormGroup;
