import React, { useState } from 'react'
import { Avatar, Paper, Button, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

import { signIn, signUp } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signUp(formData, navigate));
        }else{
            dispatch(signIn(formData, navigate));
        }
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const googleSuccess = async (res) => {
        const token = res.credential;
        const result = jwtDecode(token);

        try {
            dispatch({ type: 'AUTH', data: { result, token } });            
            navigate('/')            
        } catch (error) {
            console.error("Error during Google Sign In", error);
        }
    };

    const googleFailure = (e) => {
        console.log(e)
        console.log("Google Sign In was unsuccessful. Try Again Later.")
    }
    
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        handleShowPassword(false);
    }
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>                                    
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />    
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>                    
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="center" style={{ margin: '10px 0' }}>
                        <GoogleLogin 
                            onSuccess={googleSuccess}
                            onError={googleFailure}
                        />
                    </Grid>
                    <Grid container justify='center'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth