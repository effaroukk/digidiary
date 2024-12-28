//import react.useState,useEffect form react
import React, { useState, useEffect } from 'react';
//import Grid,TextField from material-ui
import { Grid, TextField } from "@material-ui/core";
//import useStyles from style.css
import useStyles from "./style";
//import Header from Header.js
import Header from "./Header";
//import Typography from material-ui
import Typography from '@material-ui/core/Typography';
//import Pagination from material-ui
import Pagination from '@material-ui/lab/Pagination';
//import MemoCard from memoCard.js
import MemoCard from "./memoCard";
//import RefreshIcon from material-ui
import RefreshIcon from '@material-ui/icons/Refresh';
//create a function MemoList to get all the records from the database for the perticular userid 
const MemoList = (props) => {
  const [holdCard, setholdCard] = useState([]);
  //state to hold child component prop
  const [child, setChild] = useState(false);
  //state to hold classed
  const classes = useStyles();
  //state to hande pagination
  const [page, setPage] = React.useState(1);
  //state to handle to total page count
  const [pageCount, setPageCount] = React.useState(1);
  //state to handle first page
  const [first, setFirst] = React.useState(false);
  //state to handle filter card based on the date
  const [filter, setfilter] = React.useState(false);
  //state to handle filter data
  const [filterData, setFilterData] = React.useState([]);
  //state to check if to display all tha cards or only filtered cards
  const [check, setCheck] = React.useState(false);
  //function to handle page request
  const handleChange = (event, value) => {
    setPage(value);
  };
  //function to refresh the date filter
  const handleRefresh = () => {
    setCheck(false);
    document.getElementById("date").value = "";
  }
  //funtion to handle filter based on the date
  const handlefilter = async (event, value) => {
    //set the check state to true
    setCheck(true);
    //set the page state to 1
    setPage(1);
    //get the selected date from the calender
    const date = event.target.value;
    //fetch the record from the database based on the date
    const res = await fetch(`/data/filter?date=` + encodeURIComponent(date) + "&&userId=" + props.history.location.state.id,
      {
        method: "GET"
      });
    //store the result in the data variable
    const data = await res.json();
    //if any record return from the database display all the records
    if (data.length) {
      document.getElementById("memory").style.display = "none";
    }
    else {
      document.getElementById("memory").style.display = "block";
    }
    setFilterData(data);
    //change the state of the filter
    if (filter) {

      setfilter(false);
    }
    else {

      setfilter(true);
    }
  }
  //the useEffect function is called after the page render
  useEffect(() => {
    //get all the data from the database
    async function fetchData() {
      //if check is false get all the data from the database
      if (!check) {
        const res = await fetch(`/data/read?id=` + props.history.location.state.id,
          {
            method: "GET"
          });
        //store the data in the memo
        const memo = await res.json();
        setFirst(true);
        const noOfCards = memo.reverse();
        //if any record return from the database display all the records
        if (memo.length) {
          document.getElementById("memory").style.display = "none";
        }
        //if no records display "no records"
        else {
          document.getElementById("memory").style.display = "block";
          document.getElementById("allCards").style.display = "none";
        }
        if (memo.length) {
          //get the total number of pages by dividing the total records by 3 
          //so that each page has 3 records
          let noOfPages = Math.floor(memo.length / 3);
          let remaning = 0;
          //get the reminder
          if (memo.length % 3) remaning = 1;
          //set the total number of pages
          let totalNoOfPages = noOfPages + remaning;
          //set the page count
          setPageCount(totalNoOfPages);
          //for the page 1
          if (page === 1) {
            let data = [];
            for (let i = 0; i < 3; i++) {
              if (noOfCards[i])
                data.push(noOfCards[i])

            }
            //set the state to hold first 3 records
            setholdCard(data);
          }
          //if page is not 1
          else {
            let data = []
            const noPage = page;
            //if its last page
            if (page === pageCount) {
              //get the last 3 records
              for (let i = (noPage - 1) * 3; i < noOfCards.length; i++) {
                data.push(noOfCards[i])
              }
            }
            else {

              for (let i = (noPage - 1) * 3; i <= (noPage * 3) - 1; i++) {
                data.push(noOfCards[i])
              }
            }
            //set the state to hold  3 records
            setholdCard(data);
          }
        }
      }
      //if the check state is true then filter the data card
      else {
        let noOfCards = [];
        noOfCards = filterData;
        noOfCards = noOfCards.reverse();
        setholdCard('');
        //if there is any record
        if (filterData.length) {
          let data = [];
          //get the total number of pages by dividing the total records by 3 
          //so that each page has 3 records
          let noOfPages = Math.floor(filterData.length / 3);
          let remaning = 0;
          //get the reminder
          if (filterData.length % 3) remaning = 1;
          let totalNoOfPages = noOfPages + remaning;
          //set the state to total number of pages
          setPageCount(totalNoOfPages);
          console.log(noOfCards);
          //if page is 1
          if (page === 1) {
            noOfCards = noOfCards.reverse();
            //get the first 3 records
            for (let i = 0; i < 3; i++) {
              if (noOfCards[i])
                data.push(noOfCards[i])

            }
            //set the state to hold  3 records
            setholdCard(data);
          }
          else {
            const noPage = page;
            noOfCards = noOfCards.reverse();
            //if the page is last
            if (page === pageCount) {
              //get the last 3 records
              for (let i = (noPage - 1) * 3; i < noOfCards.length; i++) {
                data.push(noOfCards[(i)])
              }

            }
            else {
              noOfCards = noOfCards.reverse();
              //get the 3 records
              for (let i = (noPage - 1) * 3; i <= (noPage * 3) - 1; i++) {
                data.push(noOfCards[i])
              }
            }
            //set the state to hold  3 records
            setholdCard(data);
          }
        }
        else {
          setPageCount(1)
        }
      }
    }
    //call the fetchData function
    fetchData();
  }, [page, first, filter, check, child]);
  return (
    // create a div to hold the cards
    <div>
      {/* header component */}
      <Header username={props.history.location.state.username} id={props.history.location.state.id} />
      {/* grid to hold the date */}
      <Grid style={{marginTop:"50px"}} container alignitems="stretch" spacing={0} className={classes.root}>
        <Grid item xs={12} style={{ backgroundColor: "white", textAlign: "center" }}>
          <TextField style={{ marginTop: "0px",fontSize:"1px" }}
            id="date"
            label="Search"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handlefilter}
          />
          <button style={{ marginTop: "14px" }} className="refresh" title="Refresh" onClick={handleRefresh}><RefreshIcon style={{ color: "black" }} /></button>
        </Grid>
      </Grid>
      {/* grid to hold the cards */}
      <Grid id="allCards" container alignitems="stretch" spacing={0}>
        {(holdCard.length) ? (holdCard.map((data) => (
          <Grid item xs={12} sm={12} lg={4} style={{ marginBottom: "70px" }}>

            {/* // create the memoCard component */}
            <MemoCard onChange={() => {
              setCheck(false);
              if (child === false) {
                setChild(true)
              }
              else {
                setChild(false)
              }
            }} key={data.id} card={data}></MemoCard>
          </Grid>))) : <h1 style={{ display: "none" }}>No data</h1>
        }
      </Grid>
      {/* if no record in the database  */}
      <h1 id="memory" style={{ display: "none" }}>No Records</h1>
      {/* footer to handle pagination */}
      <footer className={classes.footer}>
        <Typography>Page: {page}</Typography>
        <Pagination id="pagination" count={pageCount} page={page} onChange={handleChange} />
      </footer>
    </div>
  )
}
export default MemoList;
