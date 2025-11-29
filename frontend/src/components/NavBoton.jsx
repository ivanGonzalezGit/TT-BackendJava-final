import React from "react";
import styled from "styled-components";


export default function NavBoton({ cont, estilo })
{

    return (
        <button style={estilo}>
            {cont}
        </button>
    );
}
