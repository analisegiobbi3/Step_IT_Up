import React from 'react';
import '../styles/header.css';
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Header() {
  return (
    <header>
        <div className='center'>
            <div className='header-logo header-special-color'>
                <h1>Step IT up</h1>
            </div>
            <div className='header-desc'>
                <p className='header-about'>A spot where you can track and create your own fitness goals.</p>
                <p className='header-special-color'> Be your own coach</p>
            </div>
            <div className='header-btns'>
                <Button colorScheme='gray' variant='solid' size='md'>Learn more</Button>   
            </div>
        </div>
    </header>
  )
}
