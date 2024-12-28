//import the react
import React from 'react';
//import the typography,AppBar,Toolbar from material-ui
import { Typography, AppBar, Toolbar } from "@material-ui/core"
//import the HomeIcon from the material-ui
import HomeIcon from '@material-ui/icons/Home';
//import the style from the style.js
import useStyles from "./style";
//import the AddBoxIcon from material-ui 
import AddBoxIcon from '@material-ui/icons/AddBox';
//import the useHistory from react router dom
import { useHistory } from "react-router-dom";
//import the API from loginAPI.js
import API from "../utils/loginAPI";
//import the stylesheet from style.css
import "./styles.css"
//create a header function to create the navbar
const Header = (props) => {
  //get all the style 
  const classes = useStyles();
  //create an instance of userHistory
  const history = new useHistory();
  //create a function to go the search memories
  const handleCreateMemories = () => {
    history.push({
      pathname: "/search",
      state: { username: props.username, id: props.id }
    })
  }
  //create a function to go the list memories
  const handleListMemories = () => {
    history.push({
      pathname: "/list",
      state: { username: props.username, id: props.id }
    })
  }
  //create a function to go the logout 
  const handleLogOut = () => {
    API.logout()
    history.push({ pathname: "/" })
  }
  return (
    //create a div to create an Appbar
    <div className={classes.root}>
      {/* Appbar */}
      <AppBar position="fixed" style={{height:"50px"}} fullWidth>
        {/* create a toolbar */}
        <Toolbar>
          {/* logout hyperlink  */}
          <a onClick={handleLogOut} href="#" class="logoutID" alt="List">Logout</a>
          <div style={{ float: "initial" }}>
            {/* button the go to the all memories link */}
            <button class="btnList" title="Memories" onClick={handleListMemories}><HomeIcon style={{ color: "black" }} /></button>
            {/* button the go to the create memories link */}
            <button class="btnList" title="Create Memory" onClick={handleCreateMemories}><AddBoxIcon style={{ color: "black" }} /></button></div>
          <Typography variant="h6" className={classes.title} style={{ marginLeft: "auto" }}>
            {props.username}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
// export the header
export default Header;
