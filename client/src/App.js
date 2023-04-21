// import package and local component
import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client'; 
  import { setContext } from '@apollo/client/link/context';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  import Home from './pages/Home'
  import Calendar from './pages/Calendar'
  import Posts from './pages/Posts'
  import ViewPost from './pages/ViewPost'
  import Profile from './pages/Profile'
  import Header from ''
  import Login from ''
  import Signup from ''

  const httpLink = createHttpLink({
    uri: '/graphql'
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  function App() {
    const calendar = () => {
        return <Calendar />
    }

    return(
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <Header />
                    <div>
                        <Routes>
                            <Route
                                path='/'
                                element={<Home />}
                            />
                            <Route
                                path='/login'
                                element={<Login />}
                            />
                            <Route
                                path='/signup'
                                element={<Signup />}
                            />
                            <Route
                                path='/me'
                                element={<Profile />}
                            />
                            <a href="#Calendar" onClick={calendar}>
                                Calendar
                            </a>
                            <Route
                                path='/posts'
                                element={<Posts />}
                            />
                            <Route
                                path='/posts/:postId'
                                element={<ViewPost />}
                            />
                        </Routes>
                    </div>

                </div>
            </Router>
        </ApolloProvider>
    )
  }

  export default App;