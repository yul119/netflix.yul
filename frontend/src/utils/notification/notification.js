import * as React from 'react';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';

// export const showErrMsg = (msg) => (
//   <Alert style={{ margin: '20px 0' }} severity='error'>
//     {msg}
//   </Alert>
// );

export const showErrMsg = (msg) => toast.error(msg);

export const showSuccessMsg = (msg) => (
  <Alert style={{ margin: '20px 0' }} severity='success'>
    {msg}
  </Alert>
);
