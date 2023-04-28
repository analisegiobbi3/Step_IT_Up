import React, { useState, useEffect } from "react";
import { Button, Stack, Wrap, WrapItem, Center } from '@chakra-ui/react'
import "../styles/Playlists.css"
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
            <Wrap>
            {playlists.map((playlist, index) => (
                <WrapItem>
                    <Center w='180px' h='80px' bg='purple.200'>
                        <div key={index}>
                            <Button>
                                <a href={playlist.link} target="_blank" rel="noreferrer">{playlist.name}</a>
                            </Button>
                        </div>
                    </Center>
                </WrapItem>
                ))}
            </Wrap>
      </div>

    )
}

export default Playlists

