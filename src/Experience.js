import {
    Avatar,
    Card,
    CardActionArea,
    CardHeader,
    Fade,
    Grid,
    makeStyles,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import Image from 'next/image'
import { DateRange, LocationCity } from '@material-ui/icons';
import data from '../data.json'
import React, { useRef } from "react";
import useAnimate from "./useAnimate";
import {CustomizedDialogs} from "./customizedPopup";
const { experience } = data

const useStyles = makeStyles(theme => ({
    experience_cont: {
        height: `calc(100vh - ${theme.spacing(4)}px)`,
        backgroundColor: '#1d1d24',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    card: {
        width: `calc(100vh - ${theme.spacing(4)}px)`,
        backgroundColor: 'black',
        height: `calc(20vh - ${theme.spacing(4)}px)`,

    },
    cardHeader: {
        paddingTop: 0,
        maxHeight: '20%'

    },
    cardActionArea: {
        height: '100%',
        display: 'flex',
        padding: '1%',
    },
    expObj: {
        marginBottom: theme.spacing(4),
    },
}))

const getHumanDiff = (startDate, endDate) => {
    let str = ""
    const start = new Date(startDate)
    const end = !!endDate ? new Date(endDate) : new Date()
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    if (years > 0) {
        str += years + " year"
        if (years > 1)
            str += "s"
    }

    if (str.length > 0)
        str += ", "

    if (months > 0) {
        str += months + " month"
        if (months > 1)
            str += "s"
    }

    return str;
}

const Experience = React.forwardRef((props, ref) =>{

    const classes = useStyles()
    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const textAlign = mdDown ? "center" : "right"

    const animRef = useRef(null)
    const animate = useAnimate(animRef)

    return (
        <Grid  container spacing={1} className={classes.experience_cont} ref={ref}>
                <Typography variant="h2" gutterBottom align="center" style={{fontWeight: 'bold', paddingTop: '5%', paddingBottom: '2%'}}>
                    Experience
                </Typography>
            <Grid container direction="column" spacing={1} alignItems={'center'} justifyContent={'center'} style={{maxWidth: '60%'}}>
                {
                    Object.getOwnPropertyNames(experience).map((title, id) =>
                        <Grid item container justifyContent={'center'} alignItems={'center'} key={id} className={classes.expObj}>
                            {/*<Typography variant="h4" align={textAlign} gutterBottom component="p">*/}
                            {/*    {''}*/}
                            {/*</Typography>*/}
                            <Grid container item direction="column" spacing={1} justifyContent="center" alignItems={'center'}>
                                {
                                    experience[title].map(({
                                        organization,
                                        role,
                                        type,
                                        startDate,
                                        endDate,
                                        city,
                                        state,
                                        country,
                                        url,
                                        description,
                                        thumbnail
                                    }, i) =>
                                        <Grid container item xs={12} sm key={i} justifyContent={'center'} alignItems={'center'}>
                                            <Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
                                                <Card className={classes.card}>
                                                    <CardActionArea
                                                        className={classes.cardActionArea}
                                                        href={url}
                                                        target="_blank"
                                                        component={'a'}
                                                        rel="noopener noreferrer"
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly'}}>
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar variant="rounded">
                                                                    <Image
                                                                        alt={`${organization} logo`}
                                                                        src={thumbnail}
                                                                        layout="fill"
                                                                    />
                                                                </Avatar>
                                                            }
                                                           title={organization}
                                                            subheader={role + " - " + type}
                                                            content={classes.cardHeader}
                                                        />
                                                        <CardHeader
                                                            avatar={<DateRange />}
                                                            title={getHumanDiff(startDate, endDate)}
                                                            subheader={`${startDate} - ${endDate? endDate: 'Present'}`}
                                                            content={classes.cardHeader}
                                                        />
                                                        <CardHeader
                                                            avatar={<LocationCity />}
                                                            subheader={`${city}, ${country}`}
                                                            content={classes.cardHeader}
                                                        />
                                                            <div >
                                                                <CustomizedDialogs title={role} description={description} isProject={false} company={organization}/>
                                                            </div>

                                                </div>
                                                    </CardActionArea>
                                                </Card>
                                            </Fade>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
            <div ref={animRef}></div>
        </Grid>
    )
});

export {Experience}
