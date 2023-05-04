// import packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import local components
import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import Calendar from "./pages/Calendar";
import Tracker from "./pages/Tracker";
import Routine from "./pages/Routine";
import CreateRoutine from "./components/CreateRoutine";
import Profile from "./pages/Profile";
import LoginSignup from "./pages/LoginSignup";
import Playlists from "./pages/Playlists"

// import local global style sheet
import './styles/Global.css';

// define http request link
const httpLink = createHttpLink({
  uri: "/graphql",
});

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
              <Route path="/loginSignup" element={<LoginSignup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<Blog />} />
              <Route path="/posts/createPost" element={<CreatePost />} />
              <Route path="/posts/editPost/:postId" element={<EditPost />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/routines" element={<Routine />} />
              <Route path="/routines/createRoutine" element={<CreateRoutine />} />
              <Route path="/playlists" element={<Playlists />}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
