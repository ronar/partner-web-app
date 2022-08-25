import React from 'react';
import { Theme } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import UserPlaceholderInPerson from '../../icons/UserPlaceholderInPerson';
import SessionInPersonIcon from '../../icons/SessionInPersonIcon';

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

export default function SessionInPersonListItemIcon() {
	const classes = useStyles();

  return (
	  <ListItemIcon
      classes={{
        root: classes.root,
      }}
    >
      <UserPlaceholderInPerson />
      <div className={classes.sessionTypeIcon}>
      	<SessionInPersonIcon />
      </div>
    </ListItemIcon>
  );
}
