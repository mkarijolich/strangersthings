import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../components/Home"
import NavBar from "../components/NavBar";
import SearchBar from "../components/Search";
import Posts from "../components/Posts";
import Login from "../components/Login";
import Register from "../components/Register";
import Message from "../components/Message";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Edit from "../components/Edit";
import Delete from "../components/Delete";
import { fetchAllPosts } from "../api/index";
import './App.css';


function App() {
 
  let savedUsername = localStorage.getItem('username')
  let savedToken = localStorage.getItem('token')
  let savedUser = {};
  if(savedUsername && savedToken) {
    savedUser = {
      username: savedUsername,
      token: savedToken
    }
  }
  const [user, setUser] = useState(savedUser ? savedUser : {});
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPostInput, setCurrentPostInput] = useState({}); //for keeping track of edited data
  
  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    Promise.all( 
      [
        fetchAllPosts()
      ]
    )
    .then(([postsFromAPI]) => {
      setPosts(postsFromAPI);
      setFilteredPosts(postsFromAPI);
    })
  }, [])

  return (
    <Router>
      <NavBar handleLogout={handleLogout} user={user} posts={posts} setFilteredPosts={setFilteredPosts}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login  setUser={setUser}/>} />
        <Route path='/register' element={<Register  setUser={setUser} user={user}/>} />
        <Route path='/search' element={<SearchBar />} />
        <Route path='/posts/:id/edit' element={<Edit currentPostInput={currentPostInput} />} />
        <Route path='/posts/:id/delete' element={<Delete  post={currentPostInput}/>} />
        <Route path='/posts/:id/message' element={<Message post={currentPostInput}/>} />
        <Route path='/posts' element={<Posts posts={filteredPosts} user={user} setCurrentPostInput={setCurrentPostInput} setPosts={setPosts} setFilteredPosts={setFilteredPosts}/>} />
        <Route path='/profile' element={<Profile user={user} posts={posts}/>} />
        <Route path='/createpost' element={<CreatePost user={user} posts={posts}/>} />
      </Routes>
    </Router>
  );
}

export default App;
