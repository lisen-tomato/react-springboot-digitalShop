import React, { Component } from 'react'
import './index.css'

export default function LinkButton(props){
    return <button {...props} className='link-button'>{props.children}</button>
}
