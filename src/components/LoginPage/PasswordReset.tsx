
import React, { ChangeEvent, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { useAppState } from '../../state';

import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ReactComponent as GoogleLogo } from './google-logo.svg';
import { InputLabel, Theme } from '@material-ui/core';
import IntroContainer from '../IntroContainer/IntroContainer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Partner from './partner';
import TruBeLogo from './TruBeLogo';

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
  container: {
    height: '100%',
    marginBottom: '2.5em',
  },
  partnerLabelContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '52px',
    backgroundImage: Partner,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    width: '107px',
    height: '36px',
    [theme.breakpoints.down('sm')]: {
      // width: '100%',
      // height: '100px',
      // backgroundPositionY: '140px',
    },
  },
  trubeLogo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    marginBottom: '10px',
  },
  gutterBottom: {
    marginBottom: '1em',
  },
  greyColor: {
    color: theme.grey,
  },
  passwordContainer: {
    // minHeight: '120px',
    marginBottom: 24,
  },
  submitButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  linkLikeButton: {
    textDecoration: 'underline'
  },

}));

export default function PasswordResetPage() {
  const classes = useStyles();
  const { signIn, user, recoverPassword, isAuthReady } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<Error | null>(null);
  const [passwordReset, setPasswordReset] = useState<any>(null);
  const [hasPasswordBeenReset, setHasPasswordBeenReset] = useState<boolean>(false);
  const [ formFeedback, setFormFeedback ] = useState({ title: '', text: '', status: '' });

  const isAuthEnabled = Boolean(process.env.REACT_APP_SET_AUTH);

  const login = () => {
    // setAuthError(null);
    // signIn?.(password)
    //   .then(() => {
    //     history.replace(location?.state?.from || { pathname: '/' });
    //   })
    //   .catch(err => setAuthError(err));
  };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // login();
  //   history.replace('/password-reset-instructions');
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAuthError(null);

    if (!email) {
      setAuthError(new Error('Please enter a valid email'));
    }

    recoverPassword(email)
      .then(resp => {
        setPasswordReset(true);
        history.replace('/password-reset-instructions');
      })
      .catch(err => {
        if (err.status == 422) {
          setAuthError(new Error(`${err.message}`));
        }
      });

    // login();
  };


  // if (user || !isAuthEnabled) {
  //   history.replace('/');
  // }

  // if (!isAuthReady) {
  //   return null;
  // }

  return (
    <Container style={{
      height: '100%'
    }}>
      <Grid
        container
        justifyContent="center"
        direction="column"
        className={classes.container}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          flexGrow={1}
          // mb={5}
        >
          <TruBeLogo className={classes.trubeLogo} />
          <div className={classes.partnerLabelContainer} />
          {/*<img src={Partner} />*/}
          {process.env.REACT_APP_SET_AUTH === 'firebase' && (
            <>
              <Typography variant="h5" className={classes.gutterBottom}>
                Sign in to join a room
              </Typography>
              <Typography variant="body1">Sign in using your Twilio Google Account</Typography>
              <Button variant="contained" className={classes.googleButton} onClick={login} startIcon={<GoogleLogo />}>
                Sign in with Google
              </Button>
            </>
          )}

          <Typography variant="body1" color="primary" className={classes.gutterBottom}>
            Enter e-mail adress linked to your account to reset your password.
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: 40 }}>
            <Grid container justifyContent="space-between">
              <div className={classes.gutterBottom} style={{ flexGrow: 1 }}>
                {/*<InputLabel shrink htmlFor="input-email">
                  Email
                </InputLabel>*/}
                <TextField
                  id="input-email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  type="email"
                  variant="outlined"
                  placeholder="Email"
                  // size="small"
                  style={{ width: '100%' }}
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
                disabled={!email.length}
                className={classes.submitButton}
              >
                Reset password
              </Button>
            </Grid>
          </form>
        </Box>

        <Typography variant="subtitle1" className={clsx(classes.greyColor)} style={{ flexGrow: 1, textAlign: 'center' }}>
          vers. 1.0.0.1.
        </Typography>



      </Grid>
    </Container>
  );
}

