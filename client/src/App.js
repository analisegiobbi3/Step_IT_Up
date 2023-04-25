// import package and local component
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Tracker from "./pages/Tracker";
import Routine from "./pages/Routine";
import Posts from "./pages/Posts";
import ViewPost from "./pages/ViewPost";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import CreatePost from './pages/CreatePost'
// import Login from "";
import Signup from "./pages/Signup";

import './styles/Global.css';

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="global">
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Login />} />*/}
              <Route path="/signup" element={<Signup />} /> 
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/routine" element={<Routine />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<Posts />} /> 
              <Route path="/posts/addPost" element={<CreatePost />} />
              <Route path="/posts/:postId" element={<ViewPost />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
