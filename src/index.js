import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './icon-font/iconfont.css'
import App from './component/app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
