import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import LoginPage from './components/LoginPage/LoginPage';
import PasswordResetPage from './components/LoginPage/PasswordReset';
import PasswordResetInstructionsSent from './components/LoginPage/PasswordResetInstructionsSent';
import PasswordResetNewPassword from './components/LoginPage/PasswordResetNewPassword';
import MainPage from './components/MainPage/MainPage';
import Month from './components/AvailabilityPicker/Month/Month';
import AvailabilityPicker from './components/AvailabilityPicker/AvailabilityPicker';
import AreasPage from './components/AreasPage/AreasPage';
import SessionsPage from './components/SessionsPage/SessionsPage';
import SessionDetails from './components/SessionDetails/SessionDetails';
import RateSession from './components/RateSession/RateSession';
// import RunningLatePopup from './components/RunningLatePopup/RunningLatePopup';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import theme from './theme';
import './types';
import { ChatProvider } from './components/ChatProvider';
import { ParticipantProvider } from './components/ParticipantProvider';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';

import momentLocalizer from './components/AvailabilityPicker/momentLocalizer';
import moment from 'moment';


momentLocalizer();



const VideoApp = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <ParticipantProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ParticipantProvider>
    </VideoProvider>
  );
};

export const ReactApp = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UnsupportedBrowserWarning>
      <Router>
        <AppStateProvider>
          <Switch>
            <PrivateRoute exact path="/">
              {/*<VideoApp />*/}
              <MainPage />
            </PrivateRoute>
            <PrivateRoute path="/room/:URLRoomName">
              <VideoApp />
            </PrivateRoute>
            <PrivateRoute path="/main-page">
              <MainPage />
            </PrivateRoute>
            <PrivateRoute path="/areas-page">
              <AreasPage />
            </PrivateRoute>
            <PrivateRoute path="/availability-calendar">
              <AvailabilityPicker />
            </PrivateRoute>
            <PrivateRoute exact path="/sessions-page">
              <SessionsPage />
            </PrivateRoute>
            <PrivateRoute path="/sessions-page/:BookingId">
              <SessionsPage />
            </PrivateRoute>
            <Route exact path="/rate-session">
              <RateSession trainerName='Peter' />
            </Route>
            {/*<Route exact path="/running-late">
              <RunningLatePopup open onClose={() => {}} />
            </Route>*/}
            <Route exact path="/password-reset">
              <PasswordResetPage />
            </Route>
            <Route exact path="/password-reset-instructions">
              <PasswordResetInstructionsSent />
            </Route>
            <Route exact path="/password-reset-new-password">
              <PasswordResetNewPassword />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </AppStateProvider>
      </Router>
    </UnsupportedBrowserWarning>
  </MuiThemeProvider>
);

ReactDOM.render(<ReactApp />, document.getElementById('root'));
