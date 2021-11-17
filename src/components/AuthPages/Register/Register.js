import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Register.scss';
import userActions from '../../../redux/user/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import sentence from '../../../constants/constants.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dispatchAction } from '../../../utils/general/dispatch.util';

function Register({closeRegister}){
	// those are state (and in reality they are ni state ni f redux) not in redux
	const {firstname, lastname, day, month, year, loading, error, targetError, isLogged} = useSelector(state => state.users)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [condition, setCondition] = useState(false);
	const [newsletter, setNewsletter] = useState(false);

	const dispatch = useDispatch();
	let history = useHistory();

	useEffect(()=>{
		dispatch(dispatchAction(userActions.SET_STATE,{
			// user: "",
			firstname : "",
			lastname : "",
			day : 3,
			month : 12,
			year : 1989,
			error:""
		}))
	},[]);

	useEffect(() => {
		if(isLogged){
			history.push('/browse')
			closeRegister()
		}
	}, [isLogged]);


	const handleOnChange = (value,name) => {
		// dispatch(dispatchAction(userActions.SET_STATE,{[name]:value}))
		if(name=="email"){
			setEmail(value)
		}else if(name == "password"){
			setPassword(value)
		}else{
			dispatch(dispatchAction(userActions.SET_STATE,{[name]:value}))
		}
	}

	const handleSignUp = () => {
		const regexPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
		const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
		let target = ""
		if(firstname.length == 0 || lastname.length == 0 || email.length == 0 || password.length == 0){
			if(firstname.length == 0){
				toast.error("First name is required")
				target="firstname"
			}else if(lastname.length == 0){
				toast.error("Last name is required")
				target="lastname"
			}else if(email.length == 0){
				toast.error("Email is required")
				target="email"
			}else if(password.length == 0){
				toast.error("Password is required")
				target="password"
			}	
			if(target.length>0) dispatch(dispatchAction(userActions.SET_STATE,{targetError:target}))
		}
		else if(day > 31 || month > 12){
			dispatch(dispatchAction(userActions.SET_STATE, {targetError:'dateBirth'}))
			toast.error("Please enter a valid date (mm/dd/yyyy)")
		}
		else if(!regexEmail.test(email)){
			dispatch(dispatchAction(userActions.SET_STATE,{targetError:"email" }))
			toast.error("Please enter a valid email adress")
		}
		else if(!condition){
			dispatch(dispatchAction(userActions.SET_STATE,{targetError:"condition" }))
			toast.error(sentence.condition)
		} 
		else if(!regexPwd.test(password)) {
			dispatch(dispatchAction(userActions.SET_STATE,{targetError:"password"}))
			toast.error("Your password has to have at least 8 characters with a lowercase, uppercase, special character and a number")
		}
		else {
			dispatch(dispatchAction(userActions.SET_STATE, {error:"", targetError:""}))
			dispatch(dispatchAction(userActions.SIGNUP_USER,{email:email, password:password, condition:condition, newsletter:newsletter}))
		}
	}

	return(
		<div className={"center_layout hvh100"}>
			
		</div>

		
	)
}

export default Register