/**
 *
 *  Partner Rating
 *  Component
 *
 *  Created by Vladimir Shishlyannikov on @2/08/2022.
 *  Copyright (c) 2022 iWoo Ltd. All rights reserved.
 *
 */

/* eslint no-undef: "error" */

import React, { ChangeEvent, MouseEvent } from 'react';
import PropTypes from 'prop-types'; // use directly
import clsx from 'clsx';

import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import StarFullIcon from '../../icons/StarFullIcon';
import StarHalfIcon from '../../icons/StarHalfIcon';

import { makeStyles } from '@material-ui/core/styles';

type Partner = {
  partnerRatingRecap: {
    average: number;
    numberOfRatings: number;
  }
};

interface PartnerRatingProps {
  partner: Partner;
  className: string;
  trainerRatingRecapClassName: string;
  trainerNumberOfSessionsClassName: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    redColor: {
    },
    spacingRight: {
      marginRight: 8,
    },
    partnerRatingContainer: {
      color: theme.red,
      background: '#fff',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: 8
    },
    tbIcon: {
      display: 'inline-block',
      verticalAlign: 'text-bottom'
    }
}));
// className='tbk-c-red' style={{ marginTop: -5 }}
// className='tbk-c-red' style={{ marginTop: -5 }}


export const PartnerRating = ({ partner, className, trainerRatingRecapClassName, trainerNumberOfSessionsClassName, onClick }: PartnerRatingProps) => {

    const classes = useStyles();

    return (
        <Box
            display="inline-flex"
            alignItems="center"
            className={clsx(classes.partnerRatingContainer, className)} itemScope
            itemProp='aggregateRating' itemType='http://schema.org/AggregateRating'
            title={`${partner.partnerRatingRecap.average.toFixed(2)} out of 5 stars from ${partner.partnerRatingRecap.numberOfRatings} ratings`}
            aria-label={`${partner.partnerRatingRecap.average} out of 5 stars from ${partner.partnerRatingRecap.numberOfRatings} ratings`}>
            {partner.partnerRatingRecap.average === 5
                ? <StarFullIcon />
                : <StarHalfIcon />
            }

            <Typography variant="caption" className={clsx(classes.spacingRight, classes.redColor)}>
                <span className={trainerRatingRecapClassName}>{partner.partnerRatingRecap.average.toFixed(2)}</span>
            </Typography>
            <Typography variant="caption" className={classes.redColor}>
                <span role='button' className={trainerNumberOfSessionsClassName} onClick={onClick}>{partner.partnerRatingRecap.numberOfRatings} Ratings</span>
            </Typography>
            <meta itemProp='ratingValue' content={String(partner.partnerRatingRecap.average)} />
            <meta itemProp='bestRating' content='5' />
            <meta itemProp='ratingCount' content={String(partner.partnerRatingRecap.numberOfRatings)} />
        </Box>
    );
};

PartnerRating.propTypes = {
    trainerRatingRecapClassName: PropTypes.string,
    trainerNumberOfSessionsClassName: PropTypes.string,
    partner: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};
