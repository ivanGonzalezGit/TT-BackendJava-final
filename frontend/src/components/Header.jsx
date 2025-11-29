import React, {useState} from "react";
import styled from 'styled-components';
import { PiShoppingCartSimple } from "react-icons/pi";
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Nav1 from './Nav1';

const ContenedorHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #F5ABB0;
    background: #62162F;
    width: 100%;
    padding: 1rem;
`;

const Logo = styled.img`
    width: 5rem;
    height: 5rem;

    @media(max-width: 360px)
    {
    display: none;
    }
`;

const Titulo = styled.h1`
    margin: auto;
    font-size: 3rem;
    font-family: "Josefin Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
`


export default function Header()
{
    const { cart } = useContext(CartContext);

    return (
        <ContenedorHeader>

                <Logo src="./images/logoTodoBaratitoColor.svg" alt="logo">
                
                </Logo>
                <Titulo>
                    Todo Baratito
                </Titulo>
                <div style={{ paddingRight: '1rem' }}>
                    <div>{cart.length}</div>
                    <PiShoppingCartSimple size={24} color='#F5ABB0' />
                </div>

                <Nav1 />            

        </ContenedorHeader>    
    )
}