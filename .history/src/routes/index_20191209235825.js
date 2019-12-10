import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '../pages/Students';
import EditStudent from '~/pages/Students/components/Edit';
import CreateStudent from '~/pages/Students/components/Create';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/students" component={Students} isPrivate />
            <Route path="/students/edit" component={EditStudent} isPrivate />
            <Route
                path="/students/create"
                component={CreateStudent}
                isPrivate
            />
        </Switch>
    );
}
