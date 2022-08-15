import * as React from 'react';
import Alert from '@mui/material/Alert';

export const showErrMsg = (msg) => (
  <Alert style={{ margin: '20px 0' }} severity='error'>
    {msg}
  </Alert>
);

export const showSuccessMsg = (msg) => (
  <Alert style={{ margin: '20px 0' }} severity='success'>
    {msg}
  </Alert>
);
