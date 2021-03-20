import React, { Component } from 'react';
import axios from 'axios';

import DisplayListTable from '../../components/Table/DisplayListTable';
import './LandingPage.css';

// class component which will show donors list in a table
export default class LandingPage extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            donor: []
        }

        this.deleteEntry = this.deleteEntry.bind(this);
    }
    componentDidMount(){
        axios.get('/donor')
            .then(res => this.setState({ donor: res.data }))
            .catch(err => console.log(err));
    }
    deleteEntry(id){      
        axios.delete(`/donor/${id}`)
            .then(res => {
                console.log(res.data.message);
                alert(res.data.message);
                this.setState({
                    donor: this.state.donor.filter(person => person._id !== id)
                })
            })
            .catch(err => console.log(err));
    }
    render(){
        return (
            <div className='container'>
                <h1>Entries Added</h1>
                <DisplayListTable donorData={this.state.donor} deleteEntry={this.deleteEntry}/>
            </div>
        )
    }
}

