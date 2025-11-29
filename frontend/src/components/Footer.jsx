import React, {useState} from "react";
import styled from 'styled-components';

const ContenedorFooter = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

`;

const Logo = styled.img`
    width: 6.25rem;
    height: 6.25rem;
`;

const Titulo = styled.h1`
    margin: 2rem auto;
    font-family: josefin-sanz, sans-serif;
`


export default function Header()
{

    return (
        <ContenedorFooter>
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                backgroundColor: "#62162F",
                color: "#F5ABB0",
                width: "100%" }}>

                <Titulo>
                    <h3>TP Final React</h3>
                    <h5>Alumno Iván González</h5>
                </Titulo>            
            </div>

            <div style={{
                width: "100%", 
                height: "3rem", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#170000", 
                color: "#F5ABB0", 
                padding: "1rem"
                }}>

                Talento-Tech 2025
            </div>


        </ContenedorFooter>    
    )
}