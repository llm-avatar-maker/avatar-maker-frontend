import { Alert, AlertProps, Snackbar } from '@mui/material';

function MyAlert(props: AlertProps) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

interface PopupAlertProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function PopupAlert(props: PopupAlertProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={props.open}
      autoHideDuration={2000}
      onClose={props.onClose}
      key={'bottom' + 'center'}
    >
      <div>
        <MyAlert onClose={props.onClose} severity="warning">
          {props.message}
        </MyAlert>
      </div>
    </Snackbar>
  );
}
