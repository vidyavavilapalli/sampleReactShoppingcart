import  { useState, useEffect , useDebugValue } from 'react';

export default function useToggle(initialValue = false){

    const [value, setValue]  = useState(initialValue);

    const toggle =()=>{
        console.log('toggle function called');
        setValue(!value);
    }
    return[ value,toggle];

}