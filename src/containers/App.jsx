import React, { PropTypes } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import * as MyActions from '../actions/MyActions';

import Product from './Product.jsx';

const App = ({chatState, chatActions}) => (

	<Product chatState={chatState} chatActions={chatActions} />

);

const mapStateToProps = state => ({

 	chatState : state.myApplicationState

});

const mapDispatchToProps = dispatch => ({

	chatActions: bindActionCreators(MyActions, dispatch)

});


export default connect(mapStateToProps, mapDispatchToProps)(App);