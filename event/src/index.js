import {createStore} from 'redux';
import rootReducer from './reducers';
import {Cfg} from '../../system';

import {wrapStore} from 'react-chrome-redux';

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: Cfg.PORTNAME
});
