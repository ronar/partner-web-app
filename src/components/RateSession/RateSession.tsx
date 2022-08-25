import React, { PropsWithChildren, ChangeEvent, useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';
import { useAppState } from '../../state';

import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { ReactComponent as GoogleLogo } from './google-logo.svg';
import { InputLabel, Theme } from '@material-ui/core';
import IntroContainer from '../IntroContainer/IntroContainer';
import RoundedContainer from '../RoundedContainer/RoundedContainer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import UserPlaceholder from '../../icons/UserPlaceholder';
import LocationIcon from '../../icons/LocationIcon';
import CloseIcon from '../../icons/Close2Icon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import PlusIcon from '../../icons/PlusIcon';
import UserPlaceholderInPerson from '../../icons/UserPlaceholderInPerson';
import UserPlaceholderOnline from '../../icons/UserPlaceholderOnline';
import PhoneIcon from '../../icons/PhoneIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import QuestionOIcon from '../../icons/QuestionOIcon';
import Calendar64Icon from '../../icons/Calendar64Icon';
import Location64Icon from '../../icons/Location64Icon';
import SessionOnline64Icon from '../../icons/SessionOnline64Icon';
import WoKickboxingIcon from '../../icons/WoKickboxingIcon';
import CopyIcon from '../../icons/CopyIcon';
import FullStarIcon from '../../icons/FullStarIcon';

import BottomNavigation from '../BottomNavigation/BottomNavigation';
import StarsRatingBlock from '../StarsRatingBlock/StarsRatingBlock';
import RateSessionDialog from '../RateSessionDialog/RateSessionDialog';


// import SessionInPersonListItemIcon from './SessionInPersonListItemIcon';
// import SessionOnlineListItemIcon from './SessionOnlineListItemIcon';

import { makeStyles, withStyles } from '@material-ui/core/styles';
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
    marginBottom: '.5rem',
  },
  gutterBottomBase: {
    marginBottom: '1rem',
  },
  gutterBottomExtraLarge: {
    marginBottom: '1.5em',
  },
  gutterTopDoubleMedium: {
    marginTop: '2em',
  },
  gutterBottomDoubleMedium: {
    marginBottom: '2em',
  },
  gutterTopFull: {
    marginTop: 64
  },
  gutterBottomExtraExtraLarge: {
    marginBottom: 80
  },
  passcodeContainer: {
    minHeight: '120px',
  },
  bottomCtaContainer: {
    position: 'fixed',
    bottom: 100,
    left: 0,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.1)',
    zIndex: 1099
  },
  submitButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  addAreaCtaButton: {
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  whiteBasicColor: {
    color: theme.whiteBasic,
  },
  trueblackBasicColor: {
    color: theme.trueblackBasic,
  },
  redColor: {
    color: theme.red,
  },
  greyColor: {
    color: theme.grey,
  },
  greyMainColor: {
    color: theme.greyMain,
  },
  greenMainColor: {
    color: theme.greenMain,
  },
  root: {
    justifyContent: 'center',
    color: theme.trueblackBasic,
    minWidth: 24
  },
  rootArrow: {
  	color: theme.red,
  	minWidth: 24
  },
  closeBackgroundSelection: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },

  linkLikeButton: {
    textDecoration: 'underline'
  },
}));

// TODO: make component
const GreyRoundedBox = withStyles((theme) => ({
  root: {
    height: "100%",
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    borderRadius: 8,
    backgroundColor: theme.greyLight,
    // paddingTop: 10,
    // paddingBottom: 10,
  }
}))(Box);

// Fixed number of columns
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)"
};

// Variable number of columns
const gridContainer2 = {
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column"
};

const gridItem = {
  height: "100%",
  // margin: "8px",
  // border: "1px solid red"
};

interface RateSessionProps {
  // open: boolean;
  trainerName: string;
  // sessionType: string;
  // onClick(): void;
  // onClose(): void;
}

export default function RateSession({ trainerName }: PropsWithChildren<RateSessionProps>) {
  const classes = useStyles();
  const { signIn, user, booking, rateCustomer, isAuthReady } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [userStrengthRating, setUserStrengthRating] = useState(0);
  const [userEnduranceRating, setUserEnduranceRating] = useState(0);
  const [userMobilityRating, setUserMobilityRating] = useState(0);
  const [userOverallRating, setUserOverallRating] = useState(0);
  const [authError, setAuthError] = useState<Error | null>(null);

  const [rateSessionOpen, setRateSessionOpen] = useState(false);


  const isAuthEnabled = true; // Boolean(process.env.REACT_APP_SET_AUTH);

  const textInputRef = useRef<HTMLTextAreaElement>(null);

  // const setUserRating = (rating) => {
  //   // console.log(index);
  //   setDrive(index);
  // };

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = textInputRef.current?.value || ''; //(e.target as HTMLInputElement)[0].value; // e.target.inputs;

    rateCustomer(user?.id!, booking?.id!, userStrengthRating, userEnduranceRating, userMobilityRating, userOverallRating, comment)
      .then(() => setRateSessionOpen(true))
  };

  const handleRateSessionDialogClose = () => {
    setRateSessionOpen(false);
    history.push({ pathname: `/sessions-page/${booking?.id}` });
    // setMenuOpen(false);
  }

  // if (user || !isAuthEnabled) {
  //   history.replace('/');
  // }

  // if (!isAuthReady) {
  //   return null;
  // }

  return (
    <form onSubmit={handleSubmit}>

      <RoundedContainer>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={7}
        mb={3}
      >
        <Box
          flexGrow="1"
          ml={1}
          textAlign="center"
        >
          {/*<Box
            display="flex"
            alignItems="center"
            // justifyContent="space-between"
            mb={1}
          >
            <Box
              display="flex"
              className={clsx(classes.greyColor)}
              mr={1}
            >
              <WoKickboxingIcon />
            </Box>

            <Typography variant="caption" color="primary" className={classes.gutterBottom}>
                Rate the Session With
            </Typography>
          </Box>*/}

          <Typography
            variant="caption"
            color="primary"
            className={classes.gutterBottom}
            style={{ color: '#6B7178', textTransform: 'uppercase' }}
          >
              Rate the Session With
          </Typography>

          <Typography variant="h2" color="primary" className={""} >
              {booking?.user?.firstName}
          </Typography>

          <UserPlaceholder />

          {/*<Typography variant="body1" className={classes.greyColor} style={{ marginBottom: 40 }} >
              32, male
          </Typography>*/}

          <StarsRatingBlock
            className={clsx(classes.gutterBottom, classes.greyColor)}
            title="Strength"
            // rating={4}
            onRatingSet={setUserStrengthRating}
          />

          <StarsRatingBlock
            className={clsx(classes.gutterBottom, classes.greyColor)}
            title="Endurance"
            onRatingSet={setUserEnduranceRating}
          />

          <StarsRatingBlock
            className={clsx(classes.gutterBottom, classes.greyColor)}
            title="Mobility"
            onRatingSet={setUserMobilityRating}
          />

          <StarsRatingBlock
            className={clsx(classes.gutterBottom, classes.greyColor)}
            title="How was the session?"
            onRatingSet={setUserOverallRating}
          />

        </Box>
      </Box>


      {/*<GreyRoundedBox
        // display="flex"
        pt={2}
        pl={2}
        pr={2}
        pb={2}
        mb={3}
        sx={{
          padding: 16
        }}
        style={{
          height: 144
        }}
      >

        <Typography variant="subtitle2" color="primary" style={{ color: '#6B7178' }}>
          Please add some notes
        </Typography>

      </GreyRoundedBox>*/}

      <TextareaAutosize
        ref={textInputRef}
        maxRows={4}
        aria-label="Notes"
        placeholder="Please add some notes"
        style={{
          width: '100%',
          height: '144px',
          border: '0',
          borderRadius: '8px',
          backgroundColor: '#F8F8F8',
          padding: '16px',
          marginBottom: '24px',
          color: '#6B7178',
          fontSize: '16px',
          fontFamily: 'Poppins',
          fontWeight: 400
        }}
        // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />

      <Container maxWidth="sm" disableGutters className={classes.gutterBottom}>
        <Grid
            container
            justifyContent="center"

            // justifyContent="flex-end"
          >

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!userStrengthRating || !userEnduranceRating || !userMobilityRating || !userOverallRating}
              // disabled={!password.length}
              className={classes.submitButton}

              // onClick={() => setRateSessionOpen(true)}
            >
              Submit rating
            </Button>
          </Grid>
      </Container>

    </RoundedContainer>
    {/*<BottomNavigation />*/}
    <RateSessionDialog
      open={rateSessionOpen}
      onClose={handleRateSessionDialogClose}
    />
    </form>
  );
}
