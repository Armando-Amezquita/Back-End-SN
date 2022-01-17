import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Register } from '../styled-components';
import Button from '@mui/material/Button';

const NewUser = () => {
	const [ state, setState ] = useState({
		date: new Date('2014-08-18'),
        name:'',
        lastname:"",
        email:'',
        password:'',

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
                <p>Sign Up</p>
				<TextField id="outlined-basic" onChange={handlerChange} name="name" label="Name" variant="outlined" value={state.name} />
				<TextField id="outlined-basic" onChange={handlerChange} name="lastname" label="Last Name" variant="outlined" value={state.lastname} />
				<TextField
					id="date"
					label="Date of birth"
                    onChange={handlerChange}
                    name='date'
					type="date"
					defaultValue="2022-01-01"
					sx={{ width: 220 }}
					InputLabelProps={{
						shrink: true
					}}
                    value={state.date}
				/>
				<TextField id="outlined-basic" name="email" onChange={handlerChange} type="email" label="Email" variant="outlined" value={state.email} />
				<TextField id="outlined-basic" name="password" onChange={handlerChange} type="password" label="Password" variant="outlined" value={state.pasword} />
                <div className="button">
                <Button type="submit" variant="contained">Register</Button>
                </div>
			</Stack>
		</Register>
	);
};

export default NewUser;
