import React from 'react';
import './Cell.css';

//props.value, props.click, props.position

export default props => {
    let classes = "Cell "
    if (props.value === 0){
        classes += "EmptyCell"
    }else {
        classes += "FilledCell"
    }   
    return (
        <button className={classes} 
        onClick = {e => props.click && props.click({value: props.value, position: props.position})}>
            {props.value}
        </button>

    )
}