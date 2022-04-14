import React from 'react';
import {App} from './App';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux';
import {createStore} from './redux/store';

const store = createStore();

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

