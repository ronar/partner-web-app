import React from 'react';
import { Theme } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import UserPlaceholderOnline from '../../icons/UserPlaceholderOnline';
import SessionOnlineIcon from '../../icons/SessionOnlineIcon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	sessionTypeIcon: {
		display: 'flex',
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
  root: {
  	position: 'relative',
    justifyContent: 'center',
    color: theme.trueblackBasic,
    minWidth: 24
  },
}));

export default function SessionOnlineListItemIcon() {
	const classes = useStyles();

  return (
	  <ListItemIcon
      classes={{
        root: classes.root,
      }}
    >
      <UserPlaceholderOnline />
      <div className={classes.sessionTypeIcon}>
      	<SessionOnlineIcon />
      </div>
    </ListItemIcon>
  );
}
