import React, { useCallback } from 'react';
import clsx from 'clsx';
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

import CheckOIcon from '../../icons/CheckOIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: '#3BC693', /* .tbk-bg-green */ // 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // borderRadius: 3,
    // border: 0,
    // color: 'white',
    // height: 48,
    // padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    "&:hover": {
      backgroundColor: theme.greenLight,
    }
  },
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
    marginLeft: '0!important',
    marginBottom: '16px',
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
    marginTop: '16px',
    marginLeft: '0!important',
    color: '#303740 !important', /* .tbk-grey-main */
    // width: '100%',
    textTransform: 'initial',
    textDecoration: 'underline'
  },
}));

const withDefault = (val?: string) => (typeof val === 'undefined' ? 'default' : val);

export default function ContactSupportDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
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
              How do you want to contact support?
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      {/*<Divider />*/}
      <DialogActions style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button href="tel:+447459783573" className={clsx(classes.button, classes.root)} color="primary" variant="contained" onClick={onClose}>
          Phone Call
        </Button>
        <Button href="https://wa.me/4407459783573" className={clsx(classes.button, classes.root)} color="primary" variant="contained" onClick={onClose}>
          WhatsApp
        </Button>
        <Button href="mailto: support@trubeapp.com" className={clsx(classes.button, classes.root)} color="primary" variant="contained" onClick={onClose}>
          Email
        </Button>
        <button
          className={classes.linkLikeButton}
          // color="primary"
          // variant="contained"
          onClick={onClose}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
}
