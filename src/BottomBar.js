import {Avatar, Grid, Icon, IconButton, makeStyles, Tooltip, Typography} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import simpleIcons from "simple-icons";
import {iconify} from "./util";
import Cancel from "@material-ui/icons/Cancel";
import data from "../data.json";
const { about } = data

const useStyles = makeStyles(theme => ({
    imageIcon: {
        height: '80%',
    },
    iconRoot: {
        textAlign: 'center',
        height: 50,
        width: 50,
    },

    avatar: {
        height: theme.spacing(7),
        width: theme.spacing(7),
        padding: theme.spacing(2),
        borderRadius: '50%'
    },

}))

const socialDetails = about.social.map(({ alt, icon, link }) => {
    const ic = simpleIcons.get(iconify(icon)) || {
        hex: '424242',
        component: <Cancel color="white" fontSize={36}/>
    }
    return {
        alt,
        backgroundColor: '#' + ic.hex,
        icon: ic.component || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>{icon}</title>
            <path d={ic.path} fill="white"/>
        </svg>,
        link
    }
})

let iobj = {}
socialDetails.forEach(({ alt, backgroundColor }) => {
    iobj[alt] = { backgroundColor }
})

const BottomBar = () => {
    const classes = useStyles();

    return (
        <Grid container justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={3} justifyContent={'center'} alignItems={'center'}>
                <IconButton onClick={() => window.location.reload()}>
                    <Icon classes={{root: classes.iconRoot}} >
                        <img className={classes.imageIcon}  src="/android-chrome-512x512.png" alt={'icon'}/>
                    </Icon>
                </IconButton>
            </Grid>
            <Grid item xs={6} container style={{paddingBottom: 10, paddingTop: 10}}>
                <Grid container item xs={12} spacing={2} justify="center">
                    {
                        socialDetails.map(({ alt, icon, link }, i) =>
                            <Grid item key={i}>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    <Tooltip title={alt} placement="top">
                                        <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
                                            {icon}
                                        </Avatar>
                                    </Tooltip>
                                </a>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
            <Grid item xs={3} style={{paddingLeft: '5%'}}>
                <Typography>
                    Copyright © 2022 Jad. All Rights Reserved
                </Typography>
            </Grid>
        </Grid>
    )
};

export default BottomBar;
