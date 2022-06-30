import {
    Button,
    Chip,
    Fade,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import React, {useRef} from "react";
import useAnimate from "./useAnimate";
import data from '../data.json';
const { projects } = data
import {
    FiCard,
    FiCardActions,
    FiCardContent,
    FiCardMedia,
} from "./FullImageCard";
import {CustomizedDialogs} from "./customizedPopup";

const useStyles = makeStyles(theme => ({
    projects_cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        flexDirection: 'column',
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
        paddingBottom: '3%',
    },

    media: {
        height: '100%',
        opacity: 0.4,
    },

    card:{
        height: `calc(40vh - ${theme.spacing(4)}px)`,
    },

    content:{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'},

    fiCardContent: {
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,.24)",
        display: 'flex',
        flexDirection: 'row',
    },

    fiCardContentTextSecondary: {
        color: "black",
        backgroundColor: 'deepskyblue'
    },
    header:{
        position: 'relative',
        fontWeight: 'bold'
    }
}))

const Projects = React.forwardRef((props, ref) => {

    const classes = useStyles()
    const animRef = useRef(null)
    const animate = useAnimate(animRef)

    return (
        <Grid direction="row-reverse" container  justify={'center'} alignItems={'center'}  className={classes.projects_cont} ref={ref}>
                <Typography variant="h2" gutterBottom align="center" innerRef={animRef} style={{fontWeight: 'bold'}}>
                    Projects
                </Typography>
            <Grid container direction="row" spacing={8} style={{maxWidth: '70%'}}>
                {
                    !!projects && projects.map((project, index) =>
                        <Grid item xs key={index} >
                            <Fade in={animate} style={{ transitionDelay: `${200 * index}ms` }}>
                                <FiCard key={index} className={classes.card}>
                                        <FiCardMedia
                                            className={classes.media}
                                            image={project.image}
                                            title="Slurp"
                                        />
                                    <div className={classes.content}>
                                        <FiCardContent>
                                            <Grid container direction="row" spacing={1} justify={'center'}>
                                                {
                                                    !!project &&
                                                    project.tech_stack.map((tech, i) =>
                                                        <Grid item key={i}>
                                                            <Chip
                                                                key={i}
                                                                label={tech}
                                                                size="small"
                                                                className={classes.fiCardContentTextSecondary}
                                                            />
                                                        </Grid>
                                                    )
                                                }
                                            </Grid>
                                        </FiCardContent>
                                            <Typography variant="h4" gutterBottom align="center" className={classes.header}>
                                                <a href={project.link} style={{color: 'white'}} target="_blank">
                                                    {project.name}
                                                </a>
                                            </Typography>
                                        <FiCardActions>
                                            <Grid container spacing={6} >
                                                <Grid item xs={4}>
                                                    <Button size="medium" color="inherit" variant="outlined" href={project.link} target={'_blank'}>
                                                        VIEW
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <CustomizedDialogs title={project.name} description={project.description} repo={project.repository}>
                                                        LEARN MORE
                                                    </CustomizedDialogs>
                                                </Grid>
                                            </Grid>
                                        </FiCardActions>
                                    </div>
                                </FiCard>
                            </Fade>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
});

export {Projects}


