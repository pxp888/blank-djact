import axios from 'axios';


import './Topbar.css';



function Topbar({current, setCurrent, uname, setUname}) {
	function logoClicked(e) {
		e.preventDefault();
		setCurrent('landing');
	}
	
	function login(e) {
		e.preventDefault();
		setCurrent('login');
	}

	function register(e) {
		e.preventDefault();
		setCurrent('register');
	}

	function logout(e) {
		e.preventDefault();
		axios.post('http://localhost:8000/api/logout/', {
			message: 'logout',
		}).then(response => {
			axios.defaults.headers.common['Authorization'] = null;
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			setUname('');
			setCurrent('landing');
		}).catch(error => { console.log(error); });
	}

	return (
		<div id="topbar">
			<p className="logo" onClick={logoClicked}>myApp</p>
			{uname === '' ? 
				<nav>
					<p onClick={login}>Login</p>
					<p onClick={register}>register</p>
				</nav>
				:
				<nav>
					<p>{uname}</p>
					<p onClick={logout}>logout</p>
				</nav>	
			}
		</div>
	)
};

export default Topbar;

