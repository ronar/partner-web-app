import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import clsx from 'clsx';
// import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import { Theme } from '@material-ui/core';
import IntroContainer from '../IntroContainer/IntroContainer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
// import RoomNameScreen from './RoomNameScreen/RoomNameScreen';
import { useAppState } from '../../state';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useParams, useHistory, NavLink } from 'react-router-dom';
// import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import UserIcon from '../../icons/UserIcon';
import CalendarPlusIcon from '../../icons/CalendarPlusIcon';
import LocationIcon from '../../icons/LocationIcon';
import ListIcon from '../../icons/ListIcon';


export enum Steps {
  roomNameStep,
  deviceSelectionStep,
}

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

  bottomNavigationContainer: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.1)',

  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 0,
  },
  root: {
    justifyContent: 'center'
  },

  navLink: {
    textDecoration: 'none',
    "&:hover": {
      color: '#E94E32',
    }
  },

  navLinkActive: {
    color: '#E94E32',
  },
  navLinkUnselected: {
   color: '#303740',
  },
}));

const MyListItem = withStyles((theme) => ({
  root: {
    justifyContent: 'center',
    "& .MuiListItemIcon-root": {
      color: theme.greyMain,
    },
    // "& .MuiListItemText-primary": {
    //   color: theme.grey,
    // },
    "&$selected": {
      backgroundColor: 'transparent',
      // backgroundColor: "red",
      color: theme.red,
      "& .MuiListItemIcon-root": {
        color: theme.red,
      }
    },
    "&$selected:hover": {
      backgroundColor: 'transparent',
      // backgroundColor: "purple",
      color: theme.red,
      // color: "white",
      "& .MuiListItemIcon-root": {
        color: theme.red,
      }
    },
    "&:hover": {
      backgroundColor: 'transparent',
      // backgroundColor: "blue",
      color: theme.red,
      "& .MuiListItemIcon-root": {
        color: theme.red,
      }
    },
    // "& .MuiListItemText-root": {
    //   // root: {
    //     // textDecoration: 'none'
    //   // },
    //   textDecoration: 'none',
    //   color: "brown"
    // },
    // "& .MuiListItemText-root:active": {
    //   color: "white"
    // },
    // "& .MuiListItemText-root:focus": {
    //   color: "white"
    // }
  },
  selected: {},
  // typography: {
  //   root: {
  //     textDecoration: 'none',
  //     color: "red"
  //   }
  // },

}))(ListItem);


const styles = {
  listItemText: {
    // color: 'white',
    textDecoration: 'none'
  },
}

const navLinkStyles = {
  // "& .nav-link": {
    color: ""
  // },
};

const MyNavLink = withStyles((theme) => ({
  root: {
    color: "green",
  },
  "& .nav-link": {
    color: "green"
  },
  // root: {
  //   justifyContent: 'center',
  //   "& .MuiListItemIcon-root": {
  //     color: theme.greyMain,
  //   },
  // }
}))(NavLink);

export default function Bottomnavigation() {
  const classes = useStyles();
  // const { user } = useAppState();
  // const { getAudioAndVideoTracks } = useVideoContext();
  // const { URLRoomName } = useParams<{ URLRoomName?: string }>();

  // const [step, setStep] = useState(Steps.deviceSelectionStep); // useState(Steps.roomNameStep);

  // const [name, setName] = useState<string>(user?.displayName || '');
  // const [roomName, setRoomName] = useState<string>('');

  // const [mediaError, setMediaError] = useState<Error>();

  const [selectedIndex, setSelectedIndex] = useState(1);

  const searchParams = new URLSearchParams(window.location.search);
  const bookingId = searchParams.get('bookingId');

  const history = useHistory();


  // useEffect(() => {
  //   if (URLRoomName) {
  //     setRoomName(URLRoomName);
  //     if (user?.displayName) {
  //       setStep(Steps.deviceSelectionStep);
  //     }
  //   }
  // }, [user, URLRoomName]);

  // useEffect(() => {
  //   if (step === Steps.deviceSelectionStep && !mediaError) {
  //     getAudioAndVideoTracks().catch(error => {
  //       console.log('Error acquiring local media:');
  //       console.dir(error);
  //       setMediaError(error);
  //     });
  //   }
  // }, [getAudioAndVideoTracks, step, mediaError]);

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
  //   // @ts-ignore
  //   if (!window.location.origin.includes('twil.io') && !window.STORYBOOK_ENV) {
  //     window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`));
  //   }
  //   setStep(Steps.deviceSelectionStep);
  // };

  // const userId = user ? user?.id : '';

  // const handleListItemClick = (event: MouseEvent<HTMLElement>, index: number) => {
  //   setSelectedIndex(index);

  //   switch (index) {
  //     case 0: //
  //       history.push("/main-page");
  //       break;
  //     case 2:
  //       history.push("/areas-page");
  //       break;
  //     case 3:
  //       history.push("/sessions-page");
  //   }
  // };

  return (
    <Container className={classes.bottomNavigationContainer}>
      <Box
        py={2}
        // px={2}
      >
      <List component="nav" aria-label="mailbox folders" className={classes.flexContainer}>
        <MyListItem
          button
          style={{ padding: 0 }}
          selected={selectedIndex === 0}
          // onClick={(event) => handleListItemClick(event, 0)}
        >
          <MyNavLink
            to="/main-page"
            isActive={(match, location) => {
              if (!match) {
                return false;
              }

              setSelectedIndex(0);

              return true;
            }}
            className={isActive =>
              "nav-link " + clsx(classes.navLink, isActive ? classes.navLinkActive : classes.navLinkUnselected)
            }
            // style={isActive => ({
            //   // background: isActive ? '#7600dc' : '#f0f0f0',
            //   textDecoration: 'none',
            // })}
            // underline="none"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              flexDirection="column"
              // mr={2}
              // ml={2}
              // mb={3}
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <UserIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: "subtitle1" }}
                primary="Home"
                style={{ marginTop: 8, textDecoration: 'none' }}
              />
              <Typography  className={""} >

              </Typography>

            </Box>
          </MyNavLink>
        {/*<ListItem button style={{ paddingLeft: 0, paddingRight: 0 }}>*/}
        </MyListItem>
        <MyListItem
          button
          style={{ padding: 0 }}
          selected={selectedIndex === 1}
          // onClick={(event) => handleListItemClick(event, 1)}
        >
          <NavLink
            to="/availability-page"
            isActive={(match, location) => {
              if (!match) {
                return false;
              }

              setSelectedIndex(1);

              return true;
            }}
            className={isActive =>
              "nav-link " + clsx(classes.navLink, isActive ? classes.navLinkActive : classes.navLinkUnselected)
            }
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              flexDirection="column"
              // mr={2}
              // ml={2}
              // mb={3}
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <CalendarPlusIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: "subtitle1" }}
                primary="Calendar"
                style={{ marginTop: 8, textDecoration: 'none' }}
              />

            </Box>
          </NavLink>
        </MyListItem>
        <MyListItem
          button
          style={{ padding: 0 }}
          selected={selectedIndex === 2}
          // onClick={(event) => handleListItemClick(event, 2)}
        >
          <NavLink
            to="/areas-page"
            isActive={(match, location) => {
              if (!match) {
                return false;
              }

              setSelectedIndex(2);

              return true;
            }}
            className={isActive =>
              "nav-link " + clsx(classes.navLink, isActive ? classes.navLinkActive : classes.navLinkUnselected)
            }
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              flexDirection="column"
              // mr={2}
              // ml={2}
              // mb={3}
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <LocationIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "subtitle1" }} primary="Areas" style={{ marginTop: 8 }} />

            </Box>
          </NavLink>
        </MyListItem>
        <MyListItem
          button
          style={{ padding: 0 }}
          selected={selectedIndex === 3}
          // onClick={(event) => handleListItemClick(event, 3)}
        >
          <NavLink
            to="/sessions-page"
            isActive={(match, location) => {
              if (!match) {
                return false;
              }

              setSelectedIndex(3);

              return true;
            }}
            className={isActive =>
              "nav-link " + clsx(classes.navLink, isActive ? classes.navLinkActive : classes.navLinkUnselected)
            }
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              flexDirection="column"
              // mr={2}
              // ml={2}
              // mb={3}
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <ListIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "subtitle1" }} primary="Sessions" style={{ marginTop: 8 }} />

            </Box>
          </NavLink>
        </MyListItem>
      </List>
      </Box>
    </Container>
  );
}
