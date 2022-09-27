/*
 * Day Picker View!!!!!!!!!!!
 * Wrapper for containing months and do all the logic
 *
 * Created by Vladimir Shishlyannikov on 27/09/2022.
 * Copyright (c) 2022 iWoo Ltd. All rights reserved.
 */

import React, { useCallback, useRef, MouseEvent } from 'react';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';

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

import SlidingUpPanel from 'rn-sliding-up-panel';

import CheckOIcon from '../../icons/CheckOIcon';
import CloseIcon from '../../icons/Close2Icon';

import { getViewportHeight } from '../../utils';

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
  button: {
    // float: 'right',
    width: '100%',
  },
  gutterBottom: {
    paddingBottom: '24px',
  },
  runningLateButton: {
    flexGrow: 1,
    color: '#6B7178', // .tbk-grey
    backgroundColor: '#F8F8F8', // .tbk-grey-light
    // borderColor: ''
    borderColor: '#6B7178',
    borderRadius: 8,
    cursor: 'pointer',
  },
  runningLateButtonActiveState: {
    borderColor: theme.red,
  },
  closeRunningLatePopup: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },

}));

const styles = {
  container: {
    flex: 1,
    // backgroundColor: 'white',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: '100%',
  },
};

const panelStyles = {
  backdrop: {
      position: 'fixed',
      zIndex: 1000,
  },
  container: {
    position: 'fixed',
    // flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    zIndex: 1000,
  },
};

interface RunningLatePopupProps {
  // open: boolean;
  // onClose(): void;
}

const height = getViewportHeight();

const withDefault = (val?: string) => (typeof val === 'undefined' ? 'default' : val);


export default function RunningLatePopup({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (e: MouseEvent<HTMLButtonElement>, delayInMinutes?: number) => void; }) {
  const classes = useStyles();
  // const { settings, dispatchSetting } = useAppState();
  // const roomState = useRoomState();
  const isDisabled = false; // roomState !== 'disconnected';
  const [ activeButton, setActiveButton ] = React.useState();

  const panelRef = useRef<SlidingUpPanel>(null);

  React.useEffect(() => {
    if (open) {
      panelRef.current && panelRef.current.show();
    }
  }, [open]);

  const handleToggleButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, clickedButton) => {
      setActiveButton(clickedButton);
      // dispatchSetting({ name: e.target.name as keyof Settings, value: e.target.value as string });
    },
    []
  );

  const handleCtaClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    // onClose();
    onSubmit(e, activeButton === 0 ? 5 : activeButton === 1 ? 10 : 20);
    },
    [onClose, onSubmit]
  );

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
    <div>
      {open && (
        <SlidingUpPanel
          ref={panelRef}
          draggableRange={{ top: height - 24/*780*/, bottom: 0 }}
          snappingPoints={[ 118, 500 ]}
          // // onDragStart={ (position) => { this.setState({ isDragged: true }); } }
          // // onDragEnd={ (position) => { this.setState({ isDragged: false }); } }
          // onBottomReached={handleBottomReached}
          // onFullyOpen={ () => setIsFullyOpen(true) }
          // //snappingPoints={[panelExpandedY]}
          backdropStyle={panelStyles.backdrop}
          containerStyle={panelStyles.container}
          height={height - 24 /*807*/}
          friction={0.7}
        >
          {/*<div style={panelStyles.container}>*/}
          <div style={styles.container}>
            <Box
              display="flex"
              textAlign="center"
              py={1}
              px={2}
              // justifyContent="space-between"
            >
              <Box
                position="absolute"
                textAlign="center"
              >
                <button className={classes.closeRunningLatePopup} onClick={onClose}>
                  <CloseIcon />
                </button>
              </Box>
              <Typography variant="button" color="primary" className={''} style={{ flexGrow: 1 }}>
                  Running late
              </Typography>
            </Box>

            <Container
              style={{ height: '100%', borderTopRightRadius: 8, borderTopLeftRadius: 8, backgroundColor: 'white' }}
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                height="calc(100% - 66px)"
              >
              <Typography variant="body1" color="primary" className={clsx( classes.gutterBottom )} style={{ paddingTop: 24, textAlign: 'center' }}>
                How late will you be?
              </Typography>

              <Box
                display="flex"
                textAlign="center"
                // py={1}
                // px={2}
                // gap={16}
                alignItems="start"
                flexGrow={1}
                style={{
                  gap: 16
                }}
                // justifyContent="space-between"
              >

                <Box
                  display="inline-flex"
                  alignItems="center"
                  // py={1}
                  // px={2}
                  flexGrow={1}
                  sx={{
                    borderRadius: 8
                  }}
                  style={{
                    // backgroundColor: 'white',
                    // padding: '8px 16px',
                    // cursor: 'pointer',
                    // userSelect: 'none',
                    // borderRadius: 8
                  }}
                  // onClick={handleLocationOpenClick}
                >
                  <button
                    role="button"
                    // variant="contained"
                    /*className={this.props.classes.buttonsDuet}*/
                    className={clsx(classes.runningLateButton, activeButton === 0 && classes.runningLateButtonActiveState)}
                    // size="medium"
                    // style={{ flexGrow: 1 }}
                    onClick={e => handleToggleButton(e, 0)}
                  >
                    <Typography variant="subtitle1" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      About
                    </Typography>
                    <Typography variant="h2" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      5
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      Minutes
                    </Typography>
                  </button>
                </Box>

                <Box
                  display="inline-flex"
                  alignItems="center"
                  // py={1}
                  // px={2}
                  flexGrow={1}
                  sx={{
                    borderRadius: 8
                  }}
                  style={{
                    // backgroundColor: 'white',
                    // padding: '8px 16px',
                    // cursor: 'pointer',
                    // userSelect: 'none',
                    // borderRadius: 8
                  }}
                  // onClick={handleLocationOpenClick}
                >
                  <button
                    role="button"
                    // variant="contained"
                    /*className={this.props.classes.buttonsDuet}*/
                    className={clsx(classes.runningLateButton, activeButton === 1 && classes.runningLateButtonActiveState)}
                    // size="medium"
                    // style={{ flexGrow: 1 }}
                    onClick={e => handleToggleButton(e, 1)}
                  >
                    <Typography variant="subtitle1" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      About
                    </Typography>
                    <Typography variant="h2" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      10
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      Minutes
                    </Typography>
                  </button>
                </Box>

                <Box
                  display="inline-flex"
                  alignItems="center"
                  // py={1}
                  // px={2}
                  flexGrow={1}
                  sx={{
                    borderRadius: 8
                  }}
                  style={{
                    // backgroundColor: 'white',
                    // padding: '8px 16px',
                    // cursor: 'pointer',
                    // userSelect: 'none',
                    // borderRadius: 8
                  }}
                  // onClick={handleLocationOpenClick}
                >
                  <button
                    role="button"
                    // variant="contained"
                    /*className={this.props.classes.buttonsDuet}*/
                    className={clsx(classes.runningLateButton, activeButton === 2 && classes.runningLateButtonActiveState)}
                    // size="medium"
                    // style={{
                    //   flexGrow: 1,
                    // }}
                    onClick={e => handleToggleButton(e, 2)}
                  >
                    <Typography variant="subtitle1" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      About
                    </Typography>
                    <Typography variant="h2" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      20
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginBottom: 4, color: '#303740' /* .tbk-grey-main */ }}>
                      Minutes
                    </Typography>
                  </button>
                </Box>


              </Box>

              <Button
                className={clsx(classes.button, classes.gutterBottom)}
                color="primary"
                variant="contained"
                disabled={!activeButton && activeButton !== 0}
                onClick={handleCtaClick}
              >
                Send
              </Button>

              </Box>

            </Container>
          </div>
        </SlidingUpPanel>
      )}
    </div>
  );
}
