import React, { useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { inputLabels, Settings } from '../../state/settings/settingsReducer';
// import { useAppState } from '../../state';
// import useRoomState from '../../hooks/useRoomState/useRoomState';

// import CheckOIcon from '../../icons/CheckOIcon';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '320px',
    minHeight: '86px',
    padding: '32px 24px 0',
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 32px)',
    },
    '& .inputSelect': {
      width: 'calc(100% - 35px)',
    },
  },
  button: {
    // float: 'right',
    width: '100%',
  },
  paper: {
    // justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '16px',
    },
  },
  formControl: {
    display: 'block',
    margin: '1.5em 0',
    '&:first-child': {
      margin: '0 0 1.5em 0',
    },
  },
  label: {
    width: '133%', // Labels have scale(0.75) applied to them, so this effectively makes the width 100%
  },
  greyMainColor: {
    color: theme.greyMain,
  },
  linkLikeButton: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    background: 'transparent',
    border: '0',
    padding: '0',
    color: '#303740 !important', /* .tbk-grey-main */
    // width: '100%',
    textTransform: 'initial',
    textDecoration: 'underline'
  },
}));

const withDefault = (val?: string) => (typeof val === 'undefined' ? 'default' : val);

export default function DeclineSessionDialog({ open, success, onConfirm, onClose }: { open: boolean; success: boolean; onConfirm: () => void, onClose: () => void }) {
  const classes = useStyles();
  // const { settings, dispatchSetting } = useAppState();
  // const roomState = useRoomState();
  const isDisabled = false; // roomState !== 'disconnected';

  // const handleChange = useCallback(
  //   (e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
  //     dispatchSetting({ name: e.target.name as keyof Settings, value: e.target.value as string });
  //   },
  //   [dispatchSetting]
  // );

  // const handleNumberChange = useCallback(
  //   (e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
  //     if (!/[^\d]/.test(e.target.value as string)) handleChange(e);
  //   },
  //   [handleChange]
  // );

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      {/*<DialogTitle>Connection Settings</DialogTitle>*/}
      {/*<Divider />*/}
      <DialogContent className={classes.container}>
        <Grid container /*spacing={2}*/ justifyContent="center">
          <Grid item style={{ textAlign: "center" }}>
            <Typography /*hidden={!isDisabled}*/ variant="h3" className={classes.greyMainColor}>
              {success ? 'Your request has been sent' : 'Are you sure you want to decline the session?'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      {/*<Divider />*/}
      <DialogActions
        style={{
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {success ? (
          <>
          <Button className={classes.button} color="primary" variant="contained" onClick={onClose}>
            OK
          </Button>
          </>
        ) : (
          <>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            style={{ marginBottom: 32 }}
            onClick={onConfirm}
          >
            Decline
          </Button>
          <button
            className={classes.linkLikeButton}
            // color="primary"
            // variant="contained"
            onClick={onClose}
          >
            Close
          </button>
          </>
        )}

      </DialogActions>
    </Dialog>
  );
}
