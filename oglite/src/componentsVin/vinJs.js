
// import React, { Component } from "react";

// import API from "../../../utilities/API";

// class mainPage extends Component {
  
  
//   componentDidMount() {
//     this.loadArticles();
//   }
 
//   loadArticles = () => {
//     API.getArticles()
//       .then(res =>
//         this.setState({ articles: res.data, title: "", author: "", synopsis: "" })
//       )
//       .catch(err => console.log(err));
//   };


//   render(){
//     {this.state.articles.length (
//       <List>


//         {this.state.articles.map(article => {
//           return (


//             <ListItem key={article.contentId}>
//               <a href={"/books/" + article.contentId}>
//                 <strong>
//                   {article.contentTitle} by {article.author}
//                 </strong>
//               </a>
//               <DeleteBtn onClick={() => this.deleteBook(article.contentId)} />
            
//             {/* change the list item here too */}
//             </ListItem>
//           );
//         })}

//         {/* make a class that changes this from a list to indiviual section  */}
//       </List>
//       ) 
//     }
//   }

  



// };
// export default mainPage;
