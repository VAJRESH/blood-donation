import React, { Component } from 'react';
import axios from 'axios';
// import '../css/form-style.css'

export default class ShowList extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            donor: []
        }
    }
    componentDidMount(){
        axios.get('/donor/')
            .then(donor => {
                this.setState({
                    donor: donor
                })
            })
            .catch(err => console.log(err));
    }
    render(){
        return (
            <div>
                <a href='/add'>Add New Entry</a>
                <h1>Working{console.log(this.state.donor)}</h1>
            </div>
        )
    }
}

