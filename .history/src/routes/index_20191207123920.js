import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Route from './Route';

import SignIn from '../pages/SignIn';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
        </Switch>
    );
}
