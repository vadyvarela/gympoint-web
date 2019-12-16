import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '../pages/Students';
import EditStudent from '~/pages/Students/components/Edit';
import CreateStudent from '~/pages/Students/components/Create';

import Plans from '../pages/Plans';
import EditPlans from '~/pages/Plans/components/Edit';
import CreatePlans from '~/pages/Plans/components/Create';

import Registration from '../pages/Registration';
import EditRegistration from '~/pages/Registration/components/Edit';
import CreateRegistration from '~/pages/Registration/components/Create';

import Checkins from '~/pages/Checkins/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} exact isPrivate />
      <Route path="/students/edit" component={EditStudent} isPrivate />
      <Route path="/students/create" component={CreateStudent} isPrivate />

      <Route path="/plans" component={Plans} exact isPrivate />
      <Route path="/plans/edit" component={EditPlans} isPrivate />
      <Route path="/plans/create" component={CreatePlans} isPrivate />

      <Route path="/registrations" component={Registration} exact isPrivate />
      <Route
        path="/registrations/edit"
        component={EditRegistration}
        isPrivate
      />
      <Route
        path="/registrations/create"
        component={CreateRegistration}
        isPrivate
      />

      <Route path="/help" component={Checkins} isPrivate exact />
    </Switch>
  );
}
