import React, { useState } from 'react';
import axios from 'axios';


function Register({setCurrent}) {
	const [message, setMessage] = useState('');
	function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		axios.post('http://localhost:8000/api/register/', {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
			password_confirmation: data.get('password_confirmation')
		}).then(response => {
			setMessage(response.data.message);
			if(response.data.message==='registered') {
				setCurrent('login');
			}
		}).catch(error => {
			console.log(error);
		});
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}> 
				<input type="text" name="name" placeholder="Name" />
				<input type="email" name="email" placeholder="Email" />
				<input type="password" name="password" placeholder="Password" />
				<input type="password" name="password_confirmation" placeholder="Confirm Password" />
				<button type="submit">Register</button>
			</form>
			{message!=='' && <p>{message}</p>}
		</div>
	);
}

export default Register;