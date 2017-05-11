import React from 'react';

import { render } from 'react-dom';

import { applyMiddleware , createStore } from 'redux';

import { Provider } from 'react-redux';

import logger from 'redux-logger';

import thunk from 'redux-thunk';

import App from './containers/App.jsx';

import reducer from './reducers';

const myStore = createStore(reducer ,   applyMiddleware(thunk)/*, applyMiddleware(logger)*/)

render(

	<Provider store={myStore}>

		<App />

	</Provider>,

	document.getElementById('root')
);