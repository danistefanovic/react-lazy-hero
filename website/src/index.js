import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './components/App';
import './index.css';

ReactGA.initialize('UA-103011834-2');
ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);

ReactDOM.render(<App />, document.getElementById('root'));
