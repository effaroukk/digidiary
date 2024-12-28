//import the React and useState
import React, { useState } from 'react';
//import the useHistory from react router dom
import { useHistory } from "react-router-dom";
//import the Avatar from material-ui
import Avatar from '@material-ui/core/Avatar';
//import the button from material-ui
import Button from '@material-ui/core/Button';
//import the cssBaseline from material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
//import the textFieled from maerial-ui
import TextField from '@material-ui/core/TextField';
//import the Dailog from material-ui
import Dialog from '@material-ui/core/Dialog';
//import the dialogAction from materail-ui
import DialogActions from '@material-ui/core/DialogActions';
//import the DialogContent from materail-ui
import DialogContent from '@material-ui/core/DialogContent';
//import the DialogContentText from materail-ui
import DialogContentText from '@material-ui/core/DialogContentText';
//import the DialogTitle from materail-ui
import DialogTitle from '@material-ui/core/DialogTitle';
//import the DialogTitle from materail-ui
import Grid from '@material-ui/core/Grid';
//import the LockOutlinedIcon from materail-ui
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import the Typography from materail-ui
import Typography from '@material-ui/core/Typography';
//import the makeStyles from materail-ui
import { makeStyles } from '@material-ui/core/styles';
//import the image from DigitalDiary2.png
import image from "../images/DigitalDiary2.png";
//import the API form loginAPI.js
import API from "../utils/loginAPI";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: "black",
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '10%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    padding: '5%',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    float: 'center',
    height: '150px',
    marginLeft: '20px',
  },

}));
//create a signIn function 
export default function SignIn() {
  //state to handle the dialog
  const [open, setOpen] = useState(false);
  //state to handle the signup username
  const [signupUserName, setSignUpUserName] = useState();
  //state to handle the signup email
  const [signupEmail, setSignUpEmail] = useState();
  //state to handle the signup password
  const [signupPassword, setSignUpPassword] = useState();
  //state to handle the login email
  const [loginEmail, setloginEmail] = useState();
  //state to handle the login password
  const [loginPassword, setloginPassword] = useState();
  //create an instance of history
  const history = new useHistory();
  //create a function to clear all the login fields
  const handleClear = () => {
    setloginEmail('');
    setloginPassword('');
    document.getElementById("spanLoginTitle").style.display = "none";
    document.getElementById("spanLoginPassword").style.display = "none";
  }
  //function to handle the signup form
  const handleformSubmit = (e) => {
    e.preventDefault();
    //check if the username text is empty or not  
    //if its empty throw an error message
    if (document.getElementById("signupUsername").value === "") {
      document.getElementById("spanUserName").style.display = "block";
    }
    //check if the email text is empty or not  
    //if its empty throw an error message
    else if (document.getElementById("signupEmail").value === "") {
      document.getElementById("spanTitle").style.display = "block";
      document.getElementById("spanTitle").textContent = "Enter email";
    }
    //check if the password text is empty or not  
    //if its empty throw an error message
    else if (document.getElementById("signupPasswords").value === "") {
      document.getElementById("spanPassword").style.display = "block";
    }
    else {
      document.getElementById("spanTitle").style.display = "none";
      document.getElementById("spanUserName").style.display = "none";
      document.getElementById("spanPassword").style.display = "none";
      //check if the email is valid or not  
      //if its empty throw an error message
      const re = /\S+@\S+\.\S+/;
      if (re.test(signupEmail)) {
        const signUp = {
          username: signupUserName,
          password: signupPassword,
          email: signupEmail
        }
        //call the api function to create the user record
        API.signup(signUp)
          .then((data) => {
            setSignUpEmail('');
            setSignUpUserName('');
            setSignUpPassword('');
            document.getElementById("spanTitle").textContent = " ";
            setOpen(true);
          })
          .catch((err) => {
            //if fail to create the record throw an error
            document.getElementById("spanTitle").style.display = "block";
            document.getElementById("spanTitle").textContent = "Email already exist";
          })
      }
      else {
        document.getElementById("spanTitle").textContent = "Email not valid";
        document.getElementById("spanTitle").style.display = "block";
      }
    }
  }
  //function to handle the login form
  const handleformLoginSubmit = async (e) => {
    e.preventDefault();
    //check if the email text is empty or not  
    //if its empty throw an error message
    if (document.getElementById("loginEmail").value === "") {
      document.getElementById("spanLoginTitle").style.display = "block";
      document.getElementById("spanLoginTitle").textContent = "Enter Email";
    }
    //check if the password text is empty or not  
    //if its empty throw an error message
    else if (document.getElementById("loginPassword").value === "") {
      document.getElementById("spanLoginPassword").style.display = "block";
    }
    else {
      //check if the email is in correct format  
      //if its empty throw an error message
      const re = /\S+@\S+\.\S+/;
      if (re.test(loginEmail)) {
        const login = {
          password: loginPassword,
          email: loginEmail
        }
        //call the api function to get the user record
        await API.login(login)
          .then((data) => {
            document.getElementById("spanLoginTitle").style.display = "none";
            document.getElementById("spanLoginPassword").style.display = "none";
            console.log("the result is", data)
            history.push({
              pathname: "/list",
              state: { username: data.data.username, id: data.data.id }
            })
          })
          .catch((err) => {
            document.getElementById("spanLoginTitle").style.display = "block";
            document.getElementById("spanLoginTitle").textContent = "Email not exist";
          })
      }
      else {
        document.getElementById("spanLoginTitle").style.display = "block";
        document.getElementById("spanLoginTitle").textContent = "Invalid Email";
      }
    }
  }
  //function when the dialog box is closed
  const handleCardClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const imageOne = image;
  return (
    <div >
      {/* create an image logo */}
      <img className={classes.logo}
        src={imageOne}
        title="Logo"
      />
      <CssBaseline />
      {/* grid for the login and signup page */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
        </Typography>
            {/* login form */}
            <form className={classes.form} noValidate onSubmit={handleformLoginSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="loginEmail"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={loginEmail}
                onChange={(e) => { document.getElementById("spanLoginTitle").style.display = "none"; setloginEmail(e.target.value) }}
              />
              <div style={{ width: "100%", height: "20px", marginLeft: "12px" }}><span style={{ display: "none", fontStyle: 'italic', color: "red", float: "left", marginBottom: "3px" }} id="spanLoginTitle">Email not exist</span></div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="loginPassword"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => { document.getElementById("spanLoginPassword").style.display = "none"; setloginPassword(e.target.value) }}
              />
              <div style={{ width: "100%", height: "20px", marginLeft: "12px" }}><span style={{ display: "none", fontStyle: 'italic', color: "red", float: "left", marginBottom: "3px" }} id="spanLoginPassword">Enter Password</span></div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
          </Button>
              <Button variant="contained" color="secondary" size="large" onClick={handleClear} fullWidth>Clear</Button>
            </form>
          </div>
        </Grid>
        {/* sign up form */}
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
        </Typography>
            <Dialog
              open={open}
              onClose={handleCardClose}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move', textAlign: 'center', fontWeight: "bold" }} id="draggable-dialog-title">
                Successfully SignUp
        </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div>A digital diary is a place where you can record personal events and experiences online. Rather than keeping a traditional diary or notebook to express your thoughts and feelings, you can create a diary and make it available anywhere and everywhere, as long as you have access to the internet.</div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCardClose} color="primary">
                  Ok
          </Button>
              </DialogActions>
            </Dialog>
            <form className={classes.form} noValidate onSubmit={handleformSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="signupUsername"
                label="Username"
                name="username"
                autoFocus
                value={signupUserName}
                onChange={(e) => {
                  document.getElementById("spanUserName").style.display = "none"
                  ; setSignUpUserName(e.target.value)
                }}
              />
              <div style={{ width: "100%", marginLeft: "12px" }}><span style={{ display: "none", fontStyle: 'italic', color: "red", float: "left", marginBottom: "3px" }} id="spanUserName">Enter username</span></div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="signupEmail"
                label="Email Address"
                name="email"
                autoFocus
                value={signupEmail}
                onChange={(e) => {
                  document.getElementById("spanTitle").style.display = "none";
                  setSignUpEmail(e.target.value)
                }}
              />
              <div style={{ width: "100%", marginLeft: "12px" }}><span style={{ display: "none", fontStyle: 'italic', color: "red", float: "left", marginBottom: "3px" }} id="spanTitle">Email already exist</span></div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="signupPasswords"
                value={signupPassword}
                onChange={(e) => {
                  document.getElementById("spanPassword").style.display = "none";
                  setSignUpPassword(e.target.value)
                }}
              />
              <div style={{ width: "100%", marginLeft: "12px" }}><span style={{ display: "none", fontStyle: 'italic', color: "red", float: "left", marginBottom: "3px" }} id="spanPassword">Enter password</span></div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
          </Button>
            </form>
          </div>
        </Grid>
      </Grid>

    </div>
  );
}
