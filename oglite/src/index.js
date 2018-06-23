import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import mainPage from './componentsVin/vinJs'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
