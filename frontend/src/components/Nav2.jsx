import React, { useState } from "react";
import styled from 'styled-components';
import { BsList } from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import { LiaHomeSolid } from "react-icons/lia";
import NavBotonera from "./NavBotonera";
import { Link } from "react-router-dom";

export default function Nav2()
{
    const [disp, setDisp] = useState('none');

    function pivotMenu()
    {
        if(disp==='none'){
            setDisp('flex');
        }else{
            setDisp('none');
        }
    }

    const ContenedorNav2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #62162F;

    @media (min-width: 361px) {
        display: none;
    }
    
    @media (max-width: 361px) {
        :root{
        font-size: 10px;
        }
    }
    `;


    const NavBotoneraContainer = styled.div`
        display: ${disp};
        flex-direction: column;
        align-items: end;
    `;

    const Iconos = styled.div`
    display: flex;
    justify-content: space-around;
`;

    return (
        <ContenedorNav2>
            <NavBotoneraContainer display={disp}>
                <NavBotonera 
                    direction='column'
                    size='12.5rem'
                />                
            </NavBotoneraContainer>
        

            <Iconos>
                <Link to={'/'}>
                    <LiaHomeSolid size={24} color='#F5ABB0' />                
                </Link>
                <PiMagnifyingGlass size={24} color='#F5ABB0' />
                <BsList size={24} color='#F5ABB0' onClick={pivotMenu} />            
            </Iconos>
        </ContenedorNav2>
    )
}
