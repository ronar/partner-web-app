import React, { PropsWithChildren, useCallback, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Area } from '../../types';
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
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import LocationIcon from '../../icons/LocationIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import PlusIcon from '../../icons/PlusIcon';
import CloseIcon from '../../icons/Close2Icon';
import CheckBoxIcon from '../../icons/CheckBoxIcon';
import CheckBoxUncheckedIcon from '../../icons/CheckBoxUncheckedIcon';

import BottomNavigation from '../BottomNavigation/BottomNavigation';

import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

import { areas } from '../../areas';

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
    marginBottom: '1em',
  },
  gutterTopDoubleMedium: {
    marginTop: '2em',
  },
  gutterBottomDoubleMedium: {
    marginBottom: '2em',
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
  root: {
    justifyContent: 'center',
    color: theme.trueblackBasic,
    minWidth: 24
  },
  closeBackgroundSelection: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },
}));

interface AddAreaProps {
  // open: boolean;
  onClose(): void;
}

export default function AddArea({ onClose }: PropsWithChildren<AddAreaProps>) {
  const classes = useStyles();
  const { signIn, user, updatePartnerCoverage, isAuthReady } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  // const [districtFilter, setDistrictFilter] = useState('');
  const [filteredAreas, setFilteredAreas] = useState(areas);
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [authError, setAuthError] = useState<Error | null>(null);

  const isAuthEnabled = true; // Boolean(process.env.REACT_APP_SET_AUTH);

  // // contains the list of all users
  // var originalList=[users]

  // // contains list of unselected users , initally will be originalList
  // var unselectedList=[]

  useEffect(() => {
    if (!user || !user.areas) {
      return;
    }

    const userAreas = areas.filter(area => user && user.areas && user.areas.find(v => v === area.outward));
    // var selectedAreas = areas.filter {textfield1:val, textfield2:val}

    setSelectedAreas(userAreas);
  }, [user]);

  // contains object of selected users


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

    const areas = selectedAreas.map(v => v.outward);

    updatePartnerCoverage(user?.id!, areas);
  };

  // if (user || !isAuthEnabled) {
  //   history.replace('/');
  // }

  // if (!isAuthReady) {
  //   return null;
  // }

  // const filterBySearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  const handleDisctrictInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // setDistrictFilter(e.target.value)
    // Access input value
    const query = e.target.value;

    // Create copy of item list
    var updatedList = [...areas];

    // Include all elements which includes the search query
    updatedList = areas.filter(v => v.outward.toLowerCase().includes(query.toLowerCase()) || v.town.toLowerCase().includes(query.toLowerCase()));

    // updatedList = updatedList.filter((item) =>
    //   return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    // });

    // Trigger render with updated values
    setFilteredAreas(updatedList);
  }, [setFilteredAreas]);

  const toggleArea = useCallback((area) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault() // we can all this directly here now!



      // Create copy of item list
      var updatedList = [...selectedAreas];

      // Include/remove chosen element
      if (e.target.checked) {
        updatedList.push(area);
      } else {
        updatedList = updatedList.filter(v => v.outward !== area.outward)
      }

      // updatedList = areas.filter(v => v.outward.includes(query) || v.town.includes(query));


      // let categoryUpdate =  await updateCategory(catId);

      // let timeCheck = checkTime(timeAdded);

      // if(!categoryUpdate) {
      //     return console.log("Error, category was not updated")
      // }
      // if(!timeCheck) {
      //     return console.log("Error, item has been inside your cart for too long, now you gotta buy it")
      // }

      // let newItems = items.filter( i => i.id != id)
      // setItems(newItems)

      // console.log(e.target.checked);
      // this.setState({ isTrue: e.target.checked });

      setSelectedAreas(updatedList);

    }
  }, [selectedAreas, setSelectedAreas]);


  return (
    <>
{/*    <Container>
      <Typography variant="button" className={clsx(classes.gutterTopDoubleMedium, classes.gutterBottomDoubleMedium, classes.greyMainColor)}>

      </Typography>
    </Container>*/}

    <Box
      display="flex"
      textAlign="center"
      py={1}
      px={2}
      // justifyContent="space-between"
    >
      <Box
        position="absolute"
      >
        <button className={classes.closeBackgroundSelection} onClick={onClose}>
          <CloseIcon />
        </button>
      </Box>
      <Typography variant="button" color="primary" className={clsx( classes.gutterBottom )} style={{ flexGrow: 1 }}>
          Add area
      </Typography>
    </Box>




    <Box
      display="flex"
      // textAlign="center"
      pb={3}
      px={2}
      // justifyContent="space-between"
    >
      {/*<InputLabel shrink htmlFor="input-passcode">
        Search a district
      </InputLabel>*/}
      <TextField
        id="input-district"
        onChange={handleDisctrictInputChange}
        type="text"
        variant="outlined"
        placeholder="Search a district"
        size="small"
        style={{ flexGrow: 1 }}
      />
    </Box>

    {/*<Typography variant="h3" className={clsx( classes.gutterBottom, classes.greyColor)}>
        4 postcodes covered:
    </Typography>*/}

    <form onSubmit={handleSubmit}>

    <RoundedContainer
      style={{ height: 'calc(100% - 126px)', overflow: 'scroll' }}
      innerContainerStyle={{ minHeight: '100%' }}
    >
      <Box
        // display="flex"
      >
      <Container maxWidth="sm" disableGutters style={{ flexGrow: 1 }}>
        <List component="nav" aria-label="mailbox folders" disablePadding className={''}>
        {filteredAreas.map(area => (
          <>
          <ListItem button style={{ paddingLeft: 0, paddingRight: 0 }} key={area.outward}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <LocationIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button",
                  display: "inline",
                  color: "primary"
                }}
                secondaryTypographyProps={{
                  variant: "subtitle1",
                  display: "inline",
                  color: "primary"
                }}
                primary={`${area && area.outward}, `}
                secondary={area && area.town}
                style={{ marginLeft: 16 }}
              />
              <Checkbox
                checked={!!(selectedAreas.find(v => v.outward === area.outward))}
                onChange={toggleArea(area)}
                value="checkedA"
                checkedIcon={<CheckBoxIcon />}
                icon={<CheckBoxUncheckedIcon />}
                inputProps={{ 'aria-label': 'Checkbox A' }}
                // onToggle={handle
              />

            </Box>
          </ListItem>
          <Divider />
          </>
        ))}

          {/*<ListItem button divider style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <LocationIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button",
                  display: "inline",
                  color: "primary"
                }}
                secondaryTypographyProps={{
                  variant: "subtitle1",
                  display: "inline",
                  color: "primary"
                }}
                primary="E2, "
                secondary="Bethnal Green, Haggerston, Hoxton (part), Shoreditch (part), Cambridge Heath, Globe Town"
                style={{ marginLeft: 16 }}
              />

              <Checkbox
                value="checkedA"
                checkedIcon={<CheckBoxIcon />}
                icon={<CheckBoxUncheckedIcon />}
                inputProps={{ 'aria-label': 'Checkbox A' }}
              />
            </Box>
          </ListItem>
          <ListItem button style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <LocationIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button",
                  display: "inline",
                  color: "primary"
                }}
                secondaryTypographyProps={{
                  variant: "subtitle1",
                  display: "inline",
                  color: "primary"
                }}
                primary="EC1, "
                secondary="St Bartholomew's Hospital, Clerkenwell, Farringdon, Hatton Garden, Finsbury, Finsbury Estate (west), Finsbury (east), Moorfields Eye Hospital, St Luke's, Bunhill Fields"
                style={{ marginLeft: 16 }}
              />

              <Checkbox
                value="checkedA"
                checkedIcon={<CheckBoxIcon />}
                icon={<CheckBoxUncheckedIcon />}
                inputProps={{ 'aria-label': 'Checkbox A' }}
              />
            </Box>
          </ListItem>
          <Divider />
          <ListItem button style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <ListItemIcon
                classes={{
                  root: classes.root,
                }}
              >
                <LocationIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button",
                  display: "inline",
                  color: "primary"
                }}
                secondaryTypographyProps={{
                  variant: "subtitle1",
                  display: "inline",
                  color: "primary"
                }}
                primary="EC2, "
                secondary="Shoreditch, Broadgate, Liverpool Street, Old Broad Street, Tower 42, Bank of England, Guildhall, Barbican,"
                style={{ marginLeft: 16 }}
              />
              <Checkbox
                value="checkedA"
                checkedIcon={<CheckBoxIcon />}
                icon={<CheckBoxUncheckedIcon />}
                inputProps={{ 'aria-label': 'Checkbox A' }}
              />
            </Box>
          </ListItem>*/}
          <Divider light />
        </List>
      </Container>

      <Grid container justifyContent="flex-end" style={{ padding: '16px 0' }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // disabled={!password.length}
          className={classes.addAreaCtaButton}
          // onClick={onClose}
        >
          {/*<PlusIcon />*/}
          Save
        </Button>
      </Grid>
      </Box>


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

    </RoundedContainer>
    </form>
    <BottomNavigation />
    </>
  );
}
