import { Drawer, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useContext } from 'react';
import { AppContext } from '../../atoms/hooks/AppContext';
import { DRAWER_WIDTH } from '../../atoms/constants/sizes';
import Logo from '../../atoms/alignedImages/Logo';
import UserAvatarAndName from '../../molecules/UserAvatarAndName/UserAvatarAndName';
import { GoogleLogout } from 'react-google-login';
import Box from '@material-ui/core/Box';
import { Centered } from '../../atoms/Centered';
import ClickButton from '../../atoms/Button/ClickButton';
import { ForceQuestionRestAPI } from '../../../restapi/forceQuestion/ForceQuestionRestAPI';
import {useAsyncFn} from "react-use";

export function AppSidebar(props: { onLoggedOut: () => void }) {
  const classes = useStyles();
  const { handleDrawerClose } = useContext(AppContext);
  const { isOpenDrawer } = useContext(AppContext);

  const [forceQuestionState, postForceQuestion] = useAsyncFn(() => ForceQuestionRestAPI().forceQuestion())
  const [forceQuizState, postQuizQuestion] = useAsyncFn(() => ForceQuestionRestAPI().forceQuiz())

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !isOpenDrawer && classes.drawerPaperClose),
      }}
      open={isOpenDrawer}
    >
      <Box display='flex' flexDirection='column' justifyContent='space-between' p={1} m={1} bgcolor='background.paper'
           height='100%' alignItems='stretch' className={classes.box}>
        <Centered>
          <div className={classes.toolbarIcon}>
            <Logo />
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </Centered>
        <Centered>
          <ClickButton onClick={() => postForceQuestion()} disabled={forceQuestionState.loading} text='wylosuj pytanie' />
          <div style={{marginTop: "2rem"}}/>
          <ClickButton onClick={() => postQuizQuestion()} disabled={forceQuizState.loading} text='rozpocznij quiz' />
        </Centered>
        <div>
          <Centered>
            <UserAvatarAndName />
          </Centered>
          <Centered>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', justifyContent: 'center' }}>
              <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
                buttonText='Logout'
                onLogoutSuccess={props.onLoggedOut}
              />
            </div>
          </Centered>
        </div>
      </Box>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    paddingTop: '30px',
    paddingBottom: '30px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  box: {
    margin: 0,
  },
}));
