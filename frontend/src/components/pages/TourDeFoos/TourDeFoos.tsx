import {Button, MuiThemeProvider} from "@material-ui/core";
import {Centered} from "../../atoms/Shared/Centered";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React from "react";
import {
    PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW,
    PATH_FOR_LOGIN_VIEW,
    PATH_FOR_PLAYER_PROFILE_CREATION_VIEW,
    PATH_FOR_PLAYERS_PROFILES_VIEW,
    PATH_FOR_HOME_VIEW,
    PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW,
    PATH_FOR_TOURNAMENTS_SELECTION_VIEW, PATH_FOR_PLAYER_MATCHES_VIEW,
} from "../../atoms/constants/paths";

import {MatchesList} from "../../organisms/MatchesList";
import {THEME} from "../../atoms/constants/ThemeMUI";
import Footer from "../../organisms/Footer/Footer";
import {VerticalSpace} from "../../atoms/Shared/VerticalSpace";
import Header from '../../organisms/Header/Header';
import {TournamentRegistrations} from "../TournamentRegistrations";
import {HomeMenu} from "../HomeMenu/HomeMenu";


function TourDeFoos() {
    return (
        <Router>
            <MuiThemeProvider theme={THEME}>
                <Centered>
                    <Header/>
                    <Switch>
                        <Route path={PATH_FOR_LOGIN_VIEW} exact>
                            <Button>PATH_FOR_LOGIN_VIEW</Button>
                        </Route>
                        <Route path={PATH_FOR_TOURNAMENTS_SELECTION_VIEW} exact>
                            PATH_FOR_TOURNAMENTS_SELECTION_VIEW
                        </Route>
                        <Route path={PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW} exact>
                            PATH_FOR_CREATING_NEW_TOURNAMENT_VIEW
                        </Route>
                        <Route
                            path={PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW + `/:tournamentId`}
                        >
                            <Centered>
                                <TournamentRegistrations/>
                            </Centered>
                        </Route>
                        <Route path={PATH_FOR_PLAYERS_PROFILES_VIEW} exact>
                            PATH_FOR_PLAYERS_PROFILES_VIEW
                        </Route>
                        <Route path={PATH_FOR_PLAYER_PROFILE_CREATION_VIEW} exact>
                            PATH_FOR_PLAYER_PROFILE_CREATION_VIEW
                        </Route>
                        <Route path={PATH_FOR_PLAYER_MATCHES_VIEW} exact>
                            <Centered>
                                <MatchesList/>
                            </Centered>
                        </Route>

                        <Route path={PATH_FOR_HOME_VIEW} exact>
                            <HomeMenu/>
                        </Route>
                    </Switch>
                    <VerticalSpace height="35px"/>
                    <Footer/>
                </Centered>
            </MuiThemeProvider>
        </Router>
    );
}

export default TourDeFoos;