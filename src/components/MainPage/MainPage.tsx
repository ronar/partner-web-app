import React, { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import clsx from 'clsx';
import { useAppState } from '../../state';

import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import Grid from '@material-ui/core/Grid';
import { ReactComponent as GoogleLogo } from './google-logo.svg';
import { InputLabel, Theme } from '@material-ui/core';
import IntroContainer from '../IntroContainer/IntroContainer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import DividerWithText from '../DividerWithText/DividerWithText';
import QuestionOIcon from '../../icons/QuestionOIcon';
import ExclamationMarkOIcon from '../../icons/ExclamationMarkOIcon';
import SpeechBubbleIcon from '../../icons/SpeechBubbleIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';

import SessionHelper from '../SessionHelper/SessionHelper';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

import { PartnerRating } from '../PartnerRating/PartnerRating';

import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  googleButton: {
    background: 'white',
    color: 'rgb(0, 94, 166)',
    borderRadius: '4px',
    border: '2px solid rgb(2, 122, 197)',
    margin: '1.8em 0 0.7em',
    textTransform: 'none',
    boxShadow: 'none',
    padding: '0.3em 1em',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '&:hover': {
      background: 'white',
      boxShadow: 'none',
    },
  },
  errorMessage: {
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    margin: '1em 0 0.2em',
    '& svg': {
      marginRight: '0.4em',
    },
  },
  gutterBottom: {
    marginBottom: 4,//'0.5em',
  },
  gutterBottomBase: {
    marginBottom: 16
  },
  gutterBottomLarge: {
    marginBottom: 24
  },
  gutterBottomExtraExtraLarge: {
    marginBottom: 80
  },
  passcodeContainer: {
    minHeight: '120px',
  },
  submitButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  profilePictureContainer: {
    // width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    // border: `solid ${theme.palette.grey[400]}`,
    // '&.selected': {
    //   border: `solid ${theme.palette.primary.main}`,
    //   '& svg': {
    //     color: `${theme.palette.primary.main}`,
    //   },
    // },
  },

  partnerProfilePictureImage: {
    width: '163px',
    height: '163px',
    // position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    objectFit: 'cover',
    borderRadius: '10px',
    // border: `solid ${theme.palette.grey[400]}`,
    // '&:hover': {
    //   cursor: 'pointer',
    //   '& svg': {
    //     color: `${theme.palette.primary.main}`,
    //   },
    //   '& $thumbOverlay': {
    //     visibility: 'visible',
    //   },
    // },
    // '&.selected': {
    //   border: `solid ${theme.palette.primary.main}`,
    //   '& svg': {
    //     color: `${theme.palette.primary.main}`,
    //   },
    // },
  },

  greyColor: {
    color: theme.grey,
  },

  greyMainColor: {
    color: theme.greyMain,
  },

  redColor: {
    color: theme.red,
  },

  hidden: {
    display: 'none'
  },

  roundedTopContainer: {
    marginTop: -8,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    position: 'relative'
  },

  linkLikeButton: {
    textDecoration: 'underline'
  },

  closeBackgroundSelection: {
    cursor: 'pointer',
    // display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const {
    signIn,
    signOut,
    user,
    upcomingBookings,
    inProgressBookings,
    isAuthReady,
    getBookings,
    getUpcomingBookings,
    getInProgressBookings,
  } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<Error | null>(null);
  const [sessionInProgress, setSessionInProgress] = useState(false);

  const isAuthEnabled = true; // Boolean(process.env.REACT_APP_SET_AUTH);

  const name = '123';

  // const login = () => {
  //   setAuthError(null);
  //   signIn?.(email, password)
  //     .then(() => {
  //       history.replace(location?.state?.from || { pathname: '/', search: window.location.search });
  //     })
  //     .catch(err => {
  //       setAuthError(err);
  //       console.log(err);
  //     });
  // };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   login();
  // };

  // if (user || !isAuthEnabled) {
  //   history.replace('/');
  // }

  // if (!isAuthReady) {
  //   return null;
  // }

  useEffect(() => {
    // getBookings();
    getUpcomingBookings();
    getInProgressBookings();
  }, [user]);

  // const handleSessionHelperClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const handleSessionHelperClick = () => {
    if (inProgressBookings && inProgressBookings.length) {
      setSessionInProgress(false);

    } else {
      setSessionInProgress(true);
    }
    // console.log('Box click');
    // console.log(event);
  };

  const sessionHelperShowed = inProgressBookings && inProgressBookings.length ||
    upcomingBookings && upcomingBookings.length;

  return (
    <>
    <Grid container justifyContent="flex-start">

    <div
      className={classes.profilePictureContainer}
      onClick={() => {}}
    >
      <img className={clsx(classes.partnerProfilePictureImage, { selected: false })} src={user && user.photoURL ? user.photoURL : 'https://profilepics.trubeapp.com/Alan_Koetscheid.png?q=high'} alt={name} />
    </div>

    <div>

      <Typography variant="subtitle1" className={clsx(classes.gutterBottom, classes.greyColor)}>
        Your profile
      </Typography>

      <Typography variant="h2" className={classes.gutterBottomBase}>
        {user ? <><div>{user.firstName}</div><div>{user.familyName}</div></> : <><div> </div><div> </div></>}
      </Typography>

      <Box
        display="flex"
        alignItems="center"
      >
        <PartnerRating

          partner={{
            partnerRatingRecap: {
              average: user && user.partnerRating ? user.partnerRating : 5.0,
              numberOfRatings: user && user.numberOfSessions ? user.numberOfSessions : 0,
            },

          }}

          className={''}

          trainerRatingRecapClassName={''}

          trainerNumberOfSessionsClassName={classes.hidden}

          onClick={() => {}}

        />

        <Box ml={1}>
          <Typography variant="subtitle1" className={clsx(classes.gutterBottom, classes.greyColor)}>
            avg. rating
          </Typography>
        </Box>
      </Box>


    </div>


    </Grid>

    <Box
      color="white"
      className={classes.roundedTopContainer}
      style={{ paddingBottom: sessionHelperShowed ? 170 : 88 }}
    >

      <Typography variant="subtitle1" className={clsx(classes.greyColor, classes.gutterBottomLarge)}>
        <DividerWithText>Session stats</DividerWithText>
      </Typography>

      <Grid container justifyContent="flex-start">

        <Grid container justifyContent="space-evenly">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            flexDirection="column"
            mr={2}
            ml={2}
            // mb={3}
            pb={3}
            // pt={3}
          >
            <Typography variant="button" className={clsx(classes.redColor)} style={{ marginBottom: 16 }}>
              UPCOMING:
            </Typography>
            <Typography variant="h1" className={clsx(classes.redColor)}>
              {upcomingBookings ? upcomingBookings!.length : 0}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            flexDirection="column"
            mr={2}
            ml={2}
            // mb={3}
            pb={3}
          >
            <Typography variant="button" className={clsx(classes.greyColor)} style={{ marginBottom: 16 }}>
              COMPLETED:
            </Typography>
            <Typography variant="h1" className={clsx(classes.greyColor)}>
              {user && user.numberOfSessions ? user.numberOfSessions : 0}
            </Typography>
          </Box>
        </Grid>

        </Grid>

        <Typography variant="subtitle1" className={clsx(classes.greyColor, classes.gutterBottomLarge)}>
          <DividerWithText>Your income</DividerWithText>
        </Typography>

        <Grid container justifyContent="flex-start">

        <Grid container justifyContent="space-evenly">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            flexDirection="column"
            mr={2}
            ml={2}
            mb={3}
          >
            <Typography variant="button" className={clsx(classes.greyColor, classes.gutterBottom)} style={{ marginBottom: 16 }}>
              THIS MONTH:
            </Typography>
            <Typography variant="h1" className={clsx(classes.greyMainColor, classes.gutterBottom)}>
              £865
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            flexDirection="column"
            mr={2}
            ml={2}
            mb={3}

          >
            <Typography variant="button" className={clsx(classes.greyColor, classes.gutterBottom)} style={{ marginBottom: 16 }}>
              TOTALLY:
            </Typography>
            <Typography variant="h1" className={clsx(classes.greyMainColor, classes.gutterBottom)}>
              £8,2K
            </Typography>
          </Box>
        </Grid>

        <Container maxWidth="sm" disableGutters>
        <List component="nav" aria-label="mailbox folders">
          <ListItem button style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <QuestionOIcon />
              <ListItemText primary="Contact Support" style={{ marginLeft: 16 }} />
              <Box display="flex" className={classes.redColor}>
                <ArrowRightIcon />
              </Box>
            </Box>
          </ListItem>
          <Divider />
          <ListItem button divider style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <ExclamationMarkOIcon />
              <ListItemText primary="Terms and Conditions" style={{ marginLeft: 16 }} />
              <Box display="flex" className={classes.redColor}>
                <ArrowRightIcon />
              </Box>
            </Box>
          </ListItem>
          <ListItem button style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <SpeechBubbleIcon />
              <ListItemText primary="App Feedback " style={{ marginLeft: 16 }} />
              <Box display="flex" className={classes.redColor}>
                <ArrowRightIcon />
              </Box>
            </Box>
          </ListItem>
          <Divider light />
        </List>
        </Container>

        <Container maxWidth="sm" >
          <Box
            mt={4}
            textAlign="center"
            flex="1"
          >
            <button className={classes.closeBackgroundSelection} onClick={() => signOut!()}>
              <Typography variant="subtitle2" className={clsx(classes.greyColor, classes.gutterBottomExtraExtraLarge, classes.linkLikeButton)}>
                Log out
              </Typography>
            </button>
          </Box>
        </Container>


      </Grid>

      </Box>

      {sessionHelperShowed && (
        <SessionHelper
          inProgress={inProgressBookings}
          upcoming={upcomingBookings}
          onClick={handleSessionHelperClick}
        />
      )}

      <BottomNavigation />





      {/*<form onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between">
          <div className={classes.passcodeContainer}>
            <InputLabel shrink htmlFor="input-passcode">
              Email
            </InputLabel>
            <TextField
              id="input-email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="text"
              variant="outlined"
              size="small"
            />
            <InputLabel shrink htmlFor="input-passcode">
              Password
            </InputLabel>
            <TextField
              id="input-passcode"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              size="small"
            />
            <div>
              {authError && (
                <Typography variant="caption" className={classes.errorMessage}>
                  <ErrorOutlineIcon />
                  {authError.message}
                </Typography>
              )}
            </div>
          </div>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!password.length}
            className={classes.submitButton}
          >
            Submit
          </Button>
        </Grid>
      </form>*/}
    </>
  );
}
