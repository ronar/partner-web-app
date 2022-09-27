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
  TextareaAutosize,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { inputLabels, Settings } from '../../state/settings/settingsReducer';
// import { useAppState } from '../../state';
// import useRoomState from '../../hooks/useRoomState/useRoomState';

import FileIcon from '../../icons/FileIcon';
import CloseIcon from '../../icons/Close2Icon';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '320px',
    minHeight: '86px',
    padding: '32px 24px 0',
    borderRadius: 8,
    marginTop: -8,
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 32px)',
    },
    '& .inputSelect': {
      width: 'calc(100% - 35px)',
    },
  },
  textArea: {
    width: '100%',
    minHeight: '174px',
    background: '#F8F8F8',
    border: '1px solid #CBCFD5',
    borderRadius: '8px',
    resize: 'none',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: "'Poppins', Arial, sans-serif",
    lineHeight: '26px',
    outline: 'none',
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
  gutterBottom: {
    marginBottom: 24,
  },
  closeAppFeedbackPopup: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },
}));

const withDefault = (val?: string) => (typeof val === 'undefined' ? 'default' : val);

export default function AppFeedbackPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
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

  const textInputRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <DialogTitle style={{ backgroundColor: '#F8F8F8', paddingTop: 8, paddingBottom: 8, width: '100%', textAlign: 'center' }}>
        <Box
          position="absolute"
        >
          <button className={classes.closeAppFeedbackPopup} onClick={onClose}>
            <CloseIcon />
          </button>
        </Box>
        <Typography variant="button" className={classes.greyMainColor}>
          App Feedback
        </Typography>
      </DialogTitle>
      {/*<Divider />*/}
      <DialogContent className={classes.container}>
        <Grid container /*spacing={2}*/ justifyContent="center">
          <Grid item style={{ textAlign: "center" }}>
            <Typography /*hidden={!isDisabled}*/ variant="body1" className={clsx(classes.greyMainColor, classes.gutterBottom)}>
              Please, descibe your experince of using our app. What could be improved?
            </Typography>
            <TextareaAutosize
              minRows={1}
              maxRows={10}
              className={classes.textArea}
              aria-label="chat input"
              placeholder=" Describe your experience..."
              // onKeyPress={handleReturnKeyPress}
              // onChange={handleChange}
              // value={messageBody}
              data-cy-chat-input
              ref={textInputRef}
              // onFocus={() => setIsTextareaFocused(true)}
              // onBlur={() => setIsTextareaFocused(false)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      {/*<Divider />*/}
      <DialogActions>
        <Button className={classes.button} color="secondary" variant="outlined" onClick={onClose}>
          <Box
            display="flex"
            // className={classes.redColor}
            mr={2}
          >
            <FileIcon />
          </Box>
          {/*<Typography variant="button">*/}
            Add file
          {/*</Typography>*/}
        </Button>
        <Button className={classes.button} color="primary" variant="contained" onClick={onClose}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
