import { makeStyles } from '@material-ui/core/styles';
//create a function to style tha pages
export default makeStyles((theme) => ({
  //set margin for all the root div
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  //set padding for the paper
  paper: {
    padding: theme.spacing(2),
  },
  //set margin for textfield
  input:{
margin:"5px"
  },
  //set the style for the form 
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0%',
  },
  //set the style for the image 
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  //set the margin for search button
  buttonSubmit: {
    marginBottom: 10,
  },
  //set the style for card media in memoList.js
  media: {
    height: "200px",
    width:"300px",
    objectFit:"contain"
  },
  //set the style for card media in memoList.js
  media1: {
    height: "400px",
    width:"400px",
    objectFit:"contain"
  },
  //set the style for footer
  footer:{
    marginTop: "0rem",
  padding: "0rem",
  backgroundColor: "#ebf0fa",
  position: "fixed",
  bottom: "0",
  left: "0",
  width: "100%",
  height:"55px"
  },
  //set the style for imapge preview in memoSearch.js
  ImagePreview:{
    width:"100px",
    height:"100px"
  },
  //set the style for validation in list page
  validateTitle:{
    display: "none",
    color: "red",
    position: "absolute",
    fontStyle:"Italic"
  },
  //set the style for desciption field 
  scrollBox: {
    overflowY: "scroll",
    overflowX:'hidden',
    height: "125px",
    textAlign:"left"
},
//set the style for title in search page
validateTitleSearch:{
  display:"block",
  color: "red",
  float:"right",
  fontStyle:"Italic"
}


}));
