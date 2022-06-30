import React, { useEffect, useRef, useState} from 'react';
import {
  AppBar,
   Icon,
  IconButton,
  makeStyles,
  Tab, Tabs,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    // boxShadow: "none",
  },
  imageIcon: {
    height: '100%',

  },
  iconRoot: {
    textAlign: 'center',
    height: 50,
    width: 50,
  },

  tabs:{
    marginRight: '35%',
    width: '60%'
  },

}))

import {Skills} from "../src/Skills";
import {Landing} from "../src/Landing";
import {Projects} from "../src/Projects";
import {About} from "../src/About";
import {Experience} from "../src/Experience";
import BottomBar from "../src/BottomBar";



export default function Index() {

  const classes = useStyles()

  const trigger = useScrollTrigger({ disableHysteresis: true })

  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
      const position = window.pageYOffset;
      let newTab = "";
      if(position <= 0.9*skillsRef.current.offsetTop  && position >= homeRef.current.offsetTop){
        newTab = "Home";
      }
      else if(position <= 0.9*projectsRef.current.offsetTop && position >= 0.9*skillsRef.current.offsetTop){
        newTab = "Skills";
      }
      else if(position <= 0.9*experienceRef.current.offsetTop && position >= 0.9*projectsRef.current.offsetTop){
        newTab = "Projects";
      }
      else if(position <= 0.95*aboutRef.current.offsetTop && position >= 0.9*experienceRef.current.offsetTop){
        newTab = "Experience";
      }
      else if( position >= 0.8*aboutRef.current.offsetTop){
        newTab = "About";
      }

      setTab(newTab);
  };

  const [tab, setTab] = useState('Home');

  const mapper = (tab) => {
    switch (tab){
      case 'Home':
        return homeRef;
      case 'Skills':
        return skillsRef;
      case 'Experience':
        return experienceRef;
      case 'About':
        return aboutRef;
      case 'Projects':
        return projectsRef;
    }
  }
  const scrollToRef = (ref) => {
    let ratio = 1;
    if(ref === experienceRef) ratio = 0.97;
    window.scrollTo({
      top: ratio*ref.current.offsetTop,
      left: 0,
    } );
  }

  const handleChange = (event, newValue) => {
    setTab(newValue);
    scrollToRef(mapper(newValue));
  };

  return (
    <div className={classes.root}>
      <AppBar color={!trigger ? "transparent" : "inherit"} className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton onClick={() => window.location.reload()}>
            <Icon classes={{root: classes.iconRoot}} >
              <img className={classes.imageIcon}  src="/android-chrome-512x512.png" alt={'icon'}/>
            </Icon>
          </IconButton>
          <Tabs
              value={tab}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              className={classes.tabs}
          >
            <Tab value="Home" label="Home" />
            <Tab value="Skills" label="Skills" />
            <Tab value="Projects" label="Projects" />
            <Tab value="Experience" label="Experience" />
            <Tab value="About" label="About" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <div>
        <Landing ref={homeRef}/>
        <Skills ref={skillsRef}/>
        <Projects ref={projectsRef}/>
        <Experience ref={experienceRef}/>
        <About ref={aboutRef}/>
        <BottomBar/>
      </div>
    </div>
  );
}
