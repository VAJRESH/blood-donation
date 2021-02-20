import React, { Component } from 'react';
import axios from 'axios';
import '../css/show-list.css';

function DisplayList(props){
    return (
        <tr>
            <td>{props.display.name}</td>
            <td>{props.display.bloodGroup}</td>
            <td>{new Date(props.display.donationDate).toDateString()}</td>
            <td>Edit and Delete Buttons</td>
        </tr>

    );
}

export default class ShowList extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            donor: []
        }
    }
    componentDidMount(){
        axios.get('/donor')
            .then(res => this.setState({ donor: res.data }))
            .catch(err => console.log(err));
    }
    showList(){
        return (
            this.state.donor
                .map(arr => {
                    console.log(arr.name);
                    return <DisplayList display={arr} key={arr._id}/>;
                })
        );
    }
    render(){
        return (
            <div className='container'>
                <a href='/add'>Add New Entry</a>
                <h1>Entries Added</h1>    
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Blood Group</th>
                            <th>Recent Donation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

