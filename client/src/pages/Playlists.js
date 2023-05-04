// import packages
import React, { useState, useEffect } from 'react';
import env from 'react-dotenv'

// import package components and icon
import { Button, Center, SimpleGrid, Card, CardFooter, CardHeader, Heading } from '@chakra-ui/react'
import { BsSpotify } from 'react-icons/bs';

// import local style sheet
import '../styles/Playlists.css'

// functional component for playlist page
const Playlists = () => {
    // define the array of playlists, default to empty
    const [playlists, setPlaylists] = useState([])

    // on initialization
    useEffect(() => {
        // fetch from spotify API
        const getSpotifyToken = async () => {
            try { 
                // define API url and client keys
                const spotfiyURL = 'https://accounts.spotify.com/api/token'
                const clientId = env.REACT_APP_CLIENT_ID;
                const clientSecret = env.REACT_APP_CLIENT_SECRET;

                // fetch from API
                const response = await fetch(spotfiyURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`

                });
                const data = await response.json()
                // define url for workout playlists
                const url = `https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFAXlCG6QvYQ4/playlists`
                const getPlaylists = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${data.access_token}`
                    },
                })
                // populate playlist array upon fetch completion
                const playlistData = await getPlaylists.json()
                setPlaylists(
                    playlistData.playlists.items.map((playlist) => ({
                        name: playlist.name,
                        link: playlist.external_urls.spotify,
                    }))
                )
            }catch(error){
                console.error(error)
            }
        }
        // call spotify API fetch function
        getSpotifyToken()
    }, [])

    return(
        <div className='playlists-page'>
            <h1>Step IT Up With Some Music</h1>
            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {/* map thorugh playlist array and populate cards with name and buttons embedded with respective links */}
                {playlists.map((playlist, index) => (
                    <Card variant='filled' className='playlist-card'>
                        <div key={index}>
                            <CardHeader>
                                <Center>
                                    {/* playlist name */}
                                    <Heading className='playlist-name' size='md'>{playlist.name}</Heading>
                                </Center>
                            </CardHeader>
                            <Center>
                                <CardFooter>
                                    {/* playlist link embedded in logo button */}
                                    <Button className='spotify-button'>
                                        <a href={playlist.link} target='_blank' rel='noreferrer'>{<BsSpotify size='50px' />}</a>
                                    </Button>
                                </CardFooter>
                            </Center>
                        </div>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Playlists;

