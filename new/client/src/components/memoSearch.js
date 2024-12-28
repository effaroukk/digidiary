//import reacr,useStat,useContext from react
import React, { useState, useContext } from 'react';
// import API from API.js
import API from "../utils/API";
//import Grid,paper,typography,textfield,button from material-ui
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core"
//import useStyle from style.js
import useStyles from "./style";
// import useHistory from react roter dom
import { useHistory } from "react-router-dom";
//import header from header.js
import Header from "./Header";
//create a search function to create the new memoryCard
const Search = (props) => {
  //create an instance of useHistory
  const history = useHistory();
  //get all the style form useStyle
  const classes = useStyles();
  //create a state to hold the image to be uploaded
  const [uploadImage, setUploadImage] = useState();
  //create a state to holdthe image
  const [image, setImage] = useState('');
  //create a state to hold title
  const [title, setTitle] = useState();
  //create a state to hold description
  const [description, setDescription] = useState();
  //create a state to hold imageurl
  const [imageurl, setImageurl] = useState('');
  //create a function to validate the title length
  const handleLenghtValidation = (e) => {
    const value = document.getElementById("memoTitle").value;
    if (value.length <= 50)
      setTitle(e.target.value)
  }
  //create a function to validate the message length
  const handleDescLenghtValidation = (e) => {
    const value = document.getElementById("memoDesc").value;
    if (value.length <= 2000)
      setDescription(e.target.value)
  }
  //create a function to create the card
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check if the title text is empty or not  
    //if its empty throw an error message
    if (document.getElementById("memoTitle").value === "") {
      document.getElementById("spanTitle").style.display = "block";
      return
    }
    //check if the message text is empty or not  
    //if its empty throw an error message
    else if (document.getElementById("memoDesc").value === "") {
      document.getElementById("spanDesc").style.display = "block";
      return
    }
    //check if the image file is empty or not  
    //if its empty throw an error message
    else if (document.getElementById("imageFile").value === "") {
      document.getElementById("spanFile").style.display = "block";
      return
    }
    else {
      document.getElementById("spanTitle").style.display = "none";
      document.getElementById("spanDesc").style.display = "none";
      document.getElementById("spanFile").style.display = "none";
      //create a formData instnce to hold the image 
      //append the image
      //append the upload foldername
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', "Amita123");
      //call the url of cloudinary to upload the image and get the url
      const res = await fetch("https://api.cloudinary.com/v1_1/duiqykyxv/image/upload",
        {
          method: "POST",
          body: data
        });
      //the coludinary will return the url for the image
      const files = await res.json();
      //set the imageurl state  
      setImageurl(files.secure_url);
      const memories = {
        title: title,
        description: description,
        imageurl: files.secure_url,
        UserId: props.history.location.state.id
      }
      //create an API to create the memories card in the database
      await API.createMemories(memories)
        .then((data) => {
          history.push({
            pathname: "/list",
            state: { username: props.history.location.state.username, id: props.history.location.state.id }
          })
        })
    }
  }
  //if the user click on clear button alll the fields should be cleared
  const handleClear = () => {
    setTitle('');
    setDescription('');
    setImageurl(' ');
    setUploadImage('');
    document.getElementById("memoTitle").value = "";
    document.getElementById("memoDesc").value = "";
    document.getElementById("imageFile").value = ""
    document.getElementById("imagePreview").style.display = "none";
    document.getElementById("spanDesc").style.display = "none";
  }
  return (
    <div className={classes.root}>
      {/* add the header component */}
      <Header username={props.history.location.state.username} id={props.history.location.state.id} />
      {/* create a grid to add title,message and url */}
      <Grid spacing={3}>
        <Grid item xs={12} style={{ height: "500px", marginTop: "80px" }}>
          <Paper className={classes.paper} style={{ width: "50%", margin: "auto" }}>
            <form autoComplete="off" onSubmit={handleSubmit} noValidate className={classes.form}>
              <Typography varient="h6" >Create a Memory</Typography>
              <TextField id="memoTitle" value={title} onChange={(e) => { handleLenghtValidation(e); document.getElementById("spanTitle").style.display = "none" }} className={classes.input} name="Caption" variant="outlined" label="caption" fullWidth />

              <div style={{ width: "100%", height: "20px" }}><span className={classes.validateTitleSearch}>Max 50 Characters</span></div>
              <div style={{ width: "100%", height: "20px" }}><span id="spanTitle" className={classes.validateTitle}>* Enter the caption</span></div>
              <TextField rows={7}
                rowsMax={10}
                multiline id="memoDesc" value={description} onChange={(e) => { document.getElementById("spanDesc").style.display = "none"; handleDescLenghtValidation(e) }} className={classes.input} name="message" variant="outlined" label="message" fullWidth />
              <div style={{ width: "100%", height: "20px" }}><span className={classes.validateTitleSearch}>Max 2000 Characters</span></div>
              <div style={{ width: "100%", height: "20px" }}><span id="spanDesc" className={classes.validateTitle}>* Enter a message about the image</span></div>
              <div className={classes.fileInput}>
                <img id="imagePreview" style={{ display: "none", width: "100px", height: "100px" }} src={uploadImage} alt="" />
                <input id="imageFile" type="file" multiple={false} onChange={(event) => {
                  document.getElementById("spanFile").style.display = "none";
                  setImage(event.target.files[0]); if (event.target.files[0]) {
                    setUploadImage(URL.createObjectURL(event.target.files[0])); console.log("image", event.target.files[0]);
                    document.getElementById("imagePreview").style.display = "block";
                  }
                  else {
                    document.getElementById("imagePreview").style.display = "none";
                  }
                }} />
                <div style={{ width: "100%", height: "30px" }}><span id="spanFile" className={classes.validateTitle}>* Select an image</span></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={handleClear} fullWidth>Clear</Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
//export the search to be used in header
export default Search;
