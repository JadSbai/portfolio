import {Grid, makeStyles, Typography, Avatar} from "@material-ui/core";
import data from '../data.json'
import Image from 'next/image'
import React from "react";
const { about } = data

const dpx = about.social.length*10 - 2

const useStyles = makeStyles(theme => ({
    about_cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        backgroundColor: 'black'
    },
    avatar: {
        height: theme.spacing(8),
        width: theme.spacing(8),
        padding: theme.spacing(2)
    },
    dp: {
        height: 1.5* theme.spacing(Math.max(dpx, 28)),
        width:  1.5*theme.spacing(Math.max(dpx, 28))
    },
}))

const About = React.forwardRef((props, ref) => {
    const classes = useStyles()

    return(
        <Grid direction="row" container justify="center" alignItems="center" className={classes.about_cont} ref={ref} >
            <Grid item xs={1} lg={6} style={{maxWidth: '40%'}}>
                <Typography variant="h2" gutterBottom component="p" style={{fontWeight: 'bold'}}>
                    About me
                </Typography>
                <Typography variant="h5" gutterBottom component="p">
                    {about.description}
                </Typography>
                <Typography variant="h4" gutterBottom component="p" align={'center'} style={{marginTop: '4%'}}>
                    <a href={about.CV} style={{color: 'white'}} download>Download my CV</a>
                </Typography>
            </Grid>
            <Grid container direction="column" item xs={12} lg={6} spacing={2} justify="center" alignItems="center" style={{maxWidth: '30%'}}>
                <Grid item xs={12}>
                    <Avatar variant="rounded" className={classes.dp}>
                        <Image
                            alt="Display Picture"
                            src={about.picture}
                            layout={'fixed'}
                            width={dpx*12}
                            height={dpx*15}
                        />
                    </Avatar>
                </Grid>
            </Grid>
        </Grid>
    )
});

export {About}
