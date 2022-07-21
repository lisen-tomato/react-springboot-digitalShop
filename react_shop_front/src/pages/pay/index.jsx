import React, { Component } from 'react'

export default class Pay extends Component {

    render() {
        const payForm = this.props.history.location.state
        console.log(payForm);
        return (
            <div dangerouslySetInnerHTML={{__html: payForm}}>
                
            </div>
        )
    }
}
