import React from 'react';
import { Router } from 'react-router-dom';

import Route from './routes';
import history from './services/history';

function App() {
    return (
        <Router history={history}>
            <Route />
        </Router>
    );
}

export default App;
