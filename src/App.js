import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import Layout from './components/layout/Layout/Layout.js';


function App() {
	const user = JSON.parse(localStorage.getItem('user'))
	return (	
		<React.Fragment>
			<Layout user={user}  />
		</React.Fragment>
	);
}

export default App;
