import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import {isAuthenticated} from "./services/Auth";
import SignUp from "./pages/SignUp/index";
import SignIn from "./pages/Login/SignIn";
import Tarefas from "./pages/Tarefas/Index";
import Usuario from "./pages/Usuarios/Index";
import TarefasForm from "./pages/Tarefas/TarefaForm";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={Tarefas}/>
            <PrivateRoute exact path="/tarefas" component={Tarefas}/>
            <PrivateRoute exact path="/usuarios" component={Usuario}/>
            <PrivateRoute exact path="/tarefas/addEdit" component={TarefasForm}/>
            <PrivateRoute exact path="/tarefas/addEdit/:tarefaId" component={TarefasForm}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={SignIn}/>
            <Route path="*" component={() => <h1>Page not found</h1>}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;