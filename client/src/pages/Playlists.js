import React, { useState, useEffect } from "react";
import { Button, Center, SimpleGrid, Card, CardFooter, CardHeader, Heading } from '@chakra-ui/react'
import "../styles/Playlists.css"
import { BsSpotify } from "react-icons/bs";
import env from 'react-dotenv'


const Playlists = () => {
    const [playlists, setPlaylists] = useState([])


    useEffect(() => {

        const getSpotifyToken = async () => {
            try { 
                const spotfiyURL = "https://accounts.spotify.com/api/token"
                const clientId = env.REACT_APP_CLIENT_ID;
                const clientSecret = env.REACT_APP_CLIENT_SECRET;


                const response = await fetch(spotfiyURL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`

                });
                const data = await response.json()
                const url = `https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFAXlCG6QvYQ4/playlists`
                const getPlaylists = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${data.access_token}`
                    },
                })
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
        getSpotifyToken()
    }, [])

    return(
        <div>
            <h1>Step IT Up With Some Music</h1>
            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {playlists.map((playlist, index) => (
                    <Card variant='filled' className="playlist-card">
                        <div key={index}>
                            <CardHeader>
                                <Center>
                                    <Heading className="playlist-name" size='md'>{playlist.name}</Heading>
                                </Center>
                            </CardHeader>
                            <Center>
                                <CardFooter>
                                    <Button className="spotify-button">
                                        <a href={playlist.link} target="_blank" rel="noreferrer">{<BsSpotify size='50px' />}</a>
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

export default Playlists

