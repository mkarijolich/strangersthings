import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {

  const {
    failure
  } = props;

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {
          failure ?
            <Alert onClose={handleClose} severity="error">This is an error message!</Alert>
            :
            <Alert severity="success">This is a success message!</Alert>
        }
      </Snackbar>
    </Stack>
  );
}
