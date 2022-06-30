import {
    Avatar,
    Grid,
    makeStyles,
    Tooltip,
    Typography,
    useTheme,
    Zoom
} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import clsx from "clsx";
import React, { useRef} from "react";
import simpleIcons from 'simple-icons'
import data from '../data.json'
import useAnimate from "./useAnimate";
import { iconify } from "./util";
const { skills } = data

const wrapper = (sk = []) => sk.map(v => {
    const ic = simpleIcons.get(typeof v === "string" ? iconify(v) : iconify(v.icon)) || {
        title: v,
        hex: '424242',
        component: <Cancel />
    }
    return {
        alt: v.alt || v || ic.title,
        backgroundColor: v.backgroundColor || ('#' + ic.hex),
        icon: ic.component || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>{ic.title}</title>
            <path d={ic.path} fill="white" />
        </svg>,
    }
})

let wrappedSkills = {}
Object.getOwnPropertyNames(skills).forEach(type => {
    wrappedSkills[type] = wrapper(skills[type])
})

let iobj = {}
Object.values(wrappedSkills).forEach(oarr => {
    oarr.forEach(({ backgroundColor, alt }) => {
        iobj[alt] = { backgroundColor }
    })
})

const useStyles = makeStyles(theme => ({
    skills_cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        backgroundColor: '#1d1d24',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    skobj: {
        marginBottom: theme.spacing(4)
    },
    avatar: {
        height: theme.spacing(7),
        width: theme.spacing(7),
        padding: theme.spacing(1.5)
    },
    ...iobj
}))

const Skills = React.forwardRef((props, ref) =>
{
    const classes = useStyles()

    const animRef = useRef(null)
    const animate = useAnimate(animRef)

    return (
        <Grid container justify="center" alignItems="center" className={classes.skills_cont} ref={ref}>
                <Typography variant="h2" gutterBottom align="center" style={{fontWeight: 'bold'}}>
                    Skills
                </Typography>
            <Grid container item xs={12} lg={6} direction="column" spacing={4} alignItems={'center'} ref={animRef} style={{maxWidth: '60%'}}>
                {
                    Object.getOwnPropertyNames(wrappedSkills).map((title, id) =>
                        <Grid item key={id}  className={classes.skobj}>
                            <Typography variant="h4" align={'center'} gutterBottom component="p">
                                {title}
                            </Typography>
                            <Grid container item direction="row" spacing={1} justify="center">
                                {
                                    wrappedSkills[title].map(({ alt, icon }, i) =>
                                        <Grid item key={i}>
                                            <Zoom in={animate} style={{ transitionDelay: `${150 * i}ms` }}>
                                                <Tooltip title={alt.replace("_", " ")} placement="top">
                                                    <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
                                                        {icon}
                                                    </Avatar>
                                                </Tooltip>
                                            </Zoom>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
});

export {Skills}
