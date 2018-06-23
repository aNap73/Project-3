
import React, { Component } from "react";

class mainPage extends Component {
  
  
  
  displayMainPage = ({ articles }) => (
  <div
    style={{ height: 300, marginBottom: 30}}
    className="col-md-8"
  >

  //loop through each article and post it to the main page section
    {articles}
  </div>
);
};
export default mainPage;
