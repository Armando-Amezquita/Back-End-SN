import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Register } from '../styled-components';
import Button from '@mui/material/Button';

const Login = () => {
	const [ state, setState ] = useState({
		email:'',
		password:''
	});

	const handlerChange = ({ target: { name, value } }) => {
		setState({
			...state,
			[name]: value
		});
	};

	return (
		<Register>
			<Stack
                className='stack'
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '40ch' }
				}}
				noValidate
				autoComplete="off"
                onSubmit={(e)=>{e.preventDefault()}}
			>
                <p>Sign In</p>
				<TextField id="outlined-basic" onChange={handlerChange} name="email" type="email" label="Email" variant="outlined" value={state.email}/>
				<TextField id="outlined-basic" onChange={handlerChange} name="password" type="password" label="Password" variant="outlined" value={state.password}/>
                <div className="button">
                <Button type="submit" variant="contained">Login</Button>
                </div>
			</Stack>
		</Register>
	);
};

export default Login;
