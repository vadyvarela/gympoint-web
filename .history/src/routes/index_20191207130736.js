import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/dashboard" exact component={SignIn} />
        </Switch>
    );
}
