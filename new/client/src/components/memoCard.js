//import react.useState,useContext form react
import React, { useState } from 'react';
//import card from material-ui
import Card from '@material-ui/core/Card';
//import CardHeader from material-ui
import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from material-ui
import CardMedia from '@material-ui/core/CardMedia';
//import CardContent from material-ui
import CardContent from '@material-ui/core/CardContent';
//import CardActions from material-ui
import CardActions from '@material-ui/core/CardActions';
//import IconButton from material-ui
import IconButton from '@material-ui/core/IconButton';
//import Typography from material-ui
import Typography from '@material-ui/core/Typography';
//import EditIcon from material-ui
import EditIcon from '@material-ui/icons/Edit';
//import Paper,Button from material-ui
import { Paper, Button } from "@material-ui/core";
//import TextField from material-ui
import { TextField } from '@material-ui/core';
//import useStyles from material-ui
import useStyles from "./style";
//import DeleteForeverIcon from material-ui
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//import Dialog from material-ui
import Dialog from '@material-ui/core/Dialog';
//import DialogActions from material-ui
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from material-ui
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from material-ui
import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from material-ui
import DialogTitle from '@material-ui/core/DialogTitle';
//import moment from moment
import moment from "moment";
//import API from API.js
import API from "../utils/API";
//import slide from material-ui
import Slide from '@material-ui/core/Slide';
//import style from style.css
import "./styles.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//create a MemoCard function to create the card for each memroy
const MemoCard = (props) => {
  //state to open the dialog for update
  const [openCard, setOpenCard] = useState();
  //state to update title
  const [updateTitle, setUpdateTitle] = useState();
  //state for cardID
  const [cardID, setCardID] = useState();
  //state to update description
  const [updateDesc, setUpdateDesc] = useState();
  //state to open the dialog for delete
  const [open, setOpen] = useState(false);
  //state to check card succesfully deleted
  const [success, setSuccess] = useState(false);
  //state for card deletion
  const [deleteCard, setDeleteCard] = useState(false);
  //function to open the delete dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  //function to close the delete dialog
  const handleClose = () => {
    setOpen(false);
  };
  //function to open the delete dialog
  const handleClickDelete = () => {

    setDeleteCard(true);
  };
  //function to handle the length of the card title
  const handleLenghtValidation = (e) => {
    const value = document.getElementById("updateTitleCard").value;
    if (value.length <= 50)
      setUpdateTitle(e.target.value)
  }
  //function to handle the length of the card message
  const handleDescLenghtValidation = (e) => {
    const value = document.getElementById("updateDescCard").value;
    if (value.length <= 2000)
      setUpdateDesc(e.target.value)
  }
  //function to handle the deletion of the card 
  const handleDelete = async () => {
    //call an API to delete the card
    await API.deleteMemories(props.card.id)
      .then((data) => {
        setDeleteCard(false);
        props.onChange();
      })
  };
  //function to close the dialog for card deletion
  const handleCloseDelete = () => {
    setDeleteCard(false);
  };
  //function to close the dialog for card update
  const handleSucessesClose = () => {
    setSuccess(false);
  };
  //function to open the dialog for card update
  const handleCardOpen = () => {
    setCardID(props.card.id);
    setUpdateTitle(props.card.title);
    setUpdateDesc(props.card.description);
    setOpenCard(true);
  };
  //function to close the dialog for card update
  const handleCardClose = () => {
    setOpenCard(false);
  };
  //function to update the card
  const handleCardSave = async () => {
    //check if the title text is empty or not  
    //if its empty throw an error message
    if (document.getElementById("updateTitleCard").value === "") {
      document.getElementById("spanCaption").style.display = "block";

    }
    //check if the message text is empty or not  
    //if its empty throw an error message
    else if (document.getElementById("updateDescCard").value === "") {
      document.getElementById("spanMessage").style.display = "block";

    }
    else {
      document.getElementById("spanCaption").style.display = "none";
      document.getElementById("spanMessage").style.display = "none";
      setSuccess(true);
      const memories = {
        title: updateTitle,
        description: updateDesc,
        id: cardID
      }
      //call API to update memories in the database
      await API.updateMemories(memories)
        .then((data) => {
          setOpenCard(false);
          setSuccess(false);
          props.onChange();
        })
    }
  }
  const classes = useStyles();
  let image = props.card.imageurl;
  //format the date
  let date = moment(props.card.createdAt).format("DD-MM-YYYY");
  return (
    <div>
      {/* dialog to delete the card */}
      <Dialog
        open={deleteCard}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are You Sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseDelete} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      {/* create a card */}
      <Paper className={classes.paper} style={{ margin: "auto", marginTop: "10px", width: "70%" }}>
        <Card className={classes.root} style={{height:"450px"}}>
          <CardHeader id="readTitle" style={{ color: "blue" }}
            action={
              <div>
                <IconButton aria-label="settings" onClick={handleCardOpen}>
                  <EditIcon  />
                </IconButton>
                <IconButton aria-label="settings" onClick={handleClickDelete} >
                  <DeleteForeverIcon  />
                </IconButton>
              </div>
            }
            title={props.card.title}
            subheader={date}
          />
          {/* dialog to update the card */}
          <Dialog id={cardID}
            TransitionComponent={Transition}
            open={openCard}
            onClose={handleCardClose}
            aria-labelledby="draggable-dialog-title"
            maxWidth="md"
            fullWidth
            
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              Update
        </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <TextField value={updateTitle} onChange={(e) => { document.getElementById("spanCaption").style.display = "none"; handleLenghtValidation(e) }} id="updateTitleCard" className={classes.input} name="Caption" variant="outlined" label="Caption" fullWidth />
                <div style={{ width: "100%", height: "20px" }}><span className={classes.validateTitleSearch}>Max 50 Characters</span></div>
                <div style={{ width: "100%", height: "30px" }}><span id="spanCaption" className={classes.validateTitle}>* Select an caption</span></div>
                <TextField rows={7}
                  rowsMax={10}
                  multiline value={updateDesc} onChange={(e) => { document.getElementById("spanMessage").style.display = "none"; handleDescLenghtValidation(e) }} id="updateDescCard" className={classes.input} name="Description" variant="outlined" label="Message" fullWidth />
                <div style={{ width: "100%", height: "20px" }}><span className={classes.validateTitleSearch}>Max 2000 Characters</span></div>
                <div style={{ width: "100%", height: "30px" }}><span id="spanMessage" className={classes.validateTitle}>* Select an message</span></div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCardClose} color="primary">
                Cancel
          </Button>
              <Button onClick={handleCardSave} color="primary">
                Update
          </Button>
            </DialogActions>
          </Dialog>
          <TextField style={{ display: "none" }} id="createTitle" value={props.card.title} className={classes.input} name="Title" variant="outlined" label="Caption" />
          <CardMedia><img onClick={handleClickOpen} className={classes.media} alt="Mainimage" src={image} /></CardMedia>
          {/* dialog on succces update */}
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogContent dividers>
              <img onClick={handleClickOpen} className={classes.media1} src={image} alt="Mainimage" />
            </DialogContent>
          </Dialog>
          <Dialog onClose={handleSucessesClose} aria-labelledby="customized-dialog-title" open={success}>
            <DialogContent dividers>
              SuccessFully Updated
        </DialogContent>
          </Dialog>
          <CardContent>
            <Typography className={classes.scrollBox} id="readDescreption" variant="body2" color="textSecondary">
              {props.card.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          </CardActions>
        </Card>
      </Paper>
    </div>
  )
}
// export the MemoCard to be used in the memoList
export default MemoCard;
