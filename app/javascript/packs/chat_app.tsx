import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './chat/App';

const container = document.getElementById('root');
ReactDOM.render(<App roomName="general" />, container);
