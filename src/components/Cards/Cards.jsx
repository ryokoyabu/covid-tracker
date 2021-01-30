import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
// import CountUp from 'react-countup';

import cx from 'classnames';
import styles from './Cards.module.css'

const Cards = ({ data }) => {
    let statusCards = null; 
    statusCards = (
        !data ? null : ( 
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            {parseInt(data.infected, 10)}
                            {/* <CountUp start={0} end={parseInt(data.infected, 10)} duration={2.5} separator="," /> */}
                        </Typography>
                        <Typography color="textSecondary">{new Date(data.lastUpdatedApify).toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            {parseInt(data.recovered, 10)}
                            {/* <CountUp start={0} end={parseInt(data.recovered, 10)} duration={2.5} separator="," /> */}
                        </Typography>
                        <Typography color="textSecondary">{new Date(data.lastUpdatedApify).toDateString()}</Typography>
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deceased)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deceased</Typography>
                        <Typography variant="h5">
                            {parseInt(data.deceased, 10)}
                            {/* <CountUp start={0} end={parseInt(data.deceased, 10)} duration={2.5} separator="," /> */}
                        </Typography>
                        <Typography color="textSecondary">{new Date(data.lastUpdatedApify).toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths from COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        )
    );

    return (
        <div className={styles.container}>
            {statusCards}
        </div>
    )
}

export default Cards;