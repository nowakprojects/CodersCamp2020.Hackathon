import { makeStyles } from '@material-ui/core';
import {  Route, Switch } from 'react-router-dom';
import {
  PATH_FOR_MAIN_VIEW,
  PATH_FOR_USER_QUIZ,
  PATH_FOR_USER_ANSWER,
  PATH_FOR_USER_QUESTION, PATH_FOR_UNKNOWN_QUESTION,
} from '../../atoms/constants/routerPaths';
import { APP_BAR_HEIGHT } from '../../atoms/constants/sizes';
import { GroupQuestionView } from '../GroupQuestionView/GroupQuestionView';
import React from 'react';
import { Quiz } from '../../molecules/Quiz';

import Title from '../../atoms/Title/Title';
import { NavBar } from '../NavBar/NavBar';
import { GroupAnswerView } from '../GroupAnswerView/GroupAnswerView';
import { CurrentGroupQuestionUnknown } from '../CurrentGroupQuestionUknown/CurrentGroupQuestionUnknown';

export function AppMain() {
  const classes = useStyles();
  return (
    <main className={classes.content}>

      <NavBar />
      <Switch>

        <Route path={PATH_FOR_MAIN_VIEW} exact>
          <Title text='Here goes question???' />
        </Route>

        <Route path={PATH_FOR_USER_QUESTION} exact>
          <GroupQuestionView />
        </Route>

        <Route path={PATH_FOR_USER_ANSWER} exact>
          <GroupAnswerView />
        </Route>

          <Route path={PATH_FOR_USER_QUIZ} exact>
            <Quiz  />
          </Route>

        <Route path={PATH_FOR_UNKNOWN_QUESTION} exact>
          <CurrentGroupQuestionUnknown />
        </Route>

        </Switch>
    </main>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    overflow: 'hidden',
    position: 'relative',
    paddingTop: APP_BAR_HEIGHT,
    minHeight: `100vh`,
    flexGrow: 1,
    backgroundColor: '#E8EBEE',
  },
}));
