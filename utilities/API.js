import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticlesId: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticles: function(bookData) {
    return axios.post("/api/articles", bookData);
  }
};