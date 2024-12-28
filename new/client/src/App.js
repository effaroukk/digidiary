//import react
import React from "react";
//import css from aap.css
import './App.css';
//import search
import Search from "./components/memoSearch"
//import memoList.js
import List from "./components/memoList"
//import login.js
import SignIn from "./components/login"
//import browserRouter for page navigation
import {BrowserRouter as Router,Route} from "react-router-dom";
function App() {
  return (
    //router
      <Router>         
    <div className="App">
        <Route exact path="/" component={SignIn}></Route>
        <Route exact path="/list" component={List}></Route> 
        <Route exact path="/search" component={Search}></Route>
    </div>
    </Router>
  );
}

export default App;
