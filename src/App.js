import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { dispatchAction } from './utils/general/dispatch.util';
import userActions from './redux/user/actions';
import { isAuthenticated } from './utils/general/auth.util';
import Layout from './components/layout/Layout/Layout.js';
import Drawer from './components/layout/Drawer/DrawerComponent.js';

import cookie from 'js-cookie'


function App() {
	// const isLogged = JSON.parse(localStorage.getItem('isLogged'))

	const user = JSON.parse(localStorage.getItem('user'))

	const dispatch = useDispatch()


	

	// useEffect(() => {
	// 	const isAuth = isAuthenticated()
	// 	// if(isAuth){
	// 	// 	dispatch(dispatchAction(userActions.SET_STATE,{isLogged:true}))
	// 	// }else{
	// 	// 	dispatch(dispatchAction(userActions.SET_STATE,{isLogged:false}))
	// 	// }
	// },[]);
	return (	
		<React.Fragment>
			<Layout user={user}  />
		</React.Fragment>
	);
}

export default App;
