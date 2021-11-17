
import {useState, useEffect} from 'react';
import { SwipeableDrawer } from '@mui/material';
import './Drawer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTachometerAlt, faClipboardList, faBars } from '@fortawesome/free-solid-svg-icons'

function DrawerComponent({opened, onClose}){
	const [width, setWidth] = useState(0)
	const hasWindow = typeof window !== 'undefined';
	

	useEffect(() => {
		setWidth(hasWindow ? window.innerWidth : null)
	}, []);

	return(
		<SwipeableDrawer 
			anchor={"left"}
			open={opened}
			onClose={onClose}
		>
			<div className="sidebar_drawer flex fdc f1 gradient_bg" >
				<div className="flex fdr f1">
					<div className="profile_mobile flex fdc f1 jcc">
						<FontAwesomeIcon className="asc" icon={faUserCircle} size="4x" color="white"  />
						<p className="profile_name_mobile fs14 padt10 raleway txtac white">User Name</p>
					</div>
				</div>
				<div className="flex fdr f1 aic">
					<div className="menu_mobile flex f1 fdr jcc">
						<div className="flex fdc f1 fs14 aic">
							<p className="link_mobile padv15 raleway-medium white">Dashboard</p>
							<p className="link_mobile padv15 raleway-medium white">Tickets</p>
							<p className="link_mobile padv15 raleway-medium white">Clients</p>
						</div>
					</div>
				</div>
				<div className="flex fdr f1"></div>
			</div>
		</SwipeableDrawer>
	);
}


export default DrawerComponent