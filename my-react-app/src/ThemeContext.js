import React, {  createContext,useState , useContext } from 'react';

export const ThemeContext = React.createContext("red");

function ThemeButon(){

    const theme = useContext(ThemeContext);
    return(
        <button  style={{background: theme === "red"? "red" : "white"}}>Theme</button>
    )
}
