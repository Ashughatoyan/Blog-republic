import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function TestFunctional(){
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    return(
        <>
            <h1>count is {state.value}</h1>
            <button onClick={()=>{dispatch({type:'increment'})}}>increment</button>
            <button onClick={()=>{dispatch({type:'decrement'})}}>decrement</button>
        </>
    )
}