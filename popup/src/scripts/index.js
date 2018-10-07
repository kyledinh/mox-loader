import React from 'react';
import {render} from 'react-dom';
import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';
import {Cfg} from '../../../system';

import App from './components/app/App';

const proxyStore = new Store({
  portName: Cfg.PORTNAME
});

proxyStore.ready().then(() => {
  render(
     <Provider store={proxyStore}><App /></Provider>
    ,document.getElementById('app'));
});
