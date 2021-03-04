import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { sortArray, getAge } from '../helper/functions';
import '../css/show-list.css';

function DisplayList(props){
    let isMale = props.display.gender === 'Male';
    let style;
    if(isMale){
        style = { backgroundColor: 'rgb(184, 237, 247)' };
    } else {
        style = { backgroundColor: 'rgb(242, 184, 247)' };
    }
    return (
        <tr style={style}>
            <td>
                <a href={`/profile/${props.display._id}`}>
                    {`${props.display.name} (${isMale? 'M': 'F'})`}
                </a>
            </td>
            <td>{props.display.bloodGroup}</td>
            <td>{getAge(props.display.dateOfBirth)}</td>
            <td>{props.display.weight}</td>
            <td>{new Date(props.display.donationDate[props.display.donationDate.length-1]).toDateString()}</td>
            <td>
                <p>{props.display.phoneNumber}</p>
                <p>{props.display.email}</p>
            </td>
            <td>
                <p>
                    <Link to={`/edit/${props.display._id}`}>
                        <button>Edit</button>
                    </Link>
                </p>
                <p>
                    <button onClick={() => props.deleteEntry(props.display._id)}>Delete</button>
                </p>
            </td>
        </tr>

    );
}

export default class ShowList extends Component{
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
    showList(){
        return (
            this.state.donor
                .map(arr => {
                    console.log(arr);
                    arr.donationDate = sortArray(arr.donationDate)
                    return <DisplayList display={arr} key={arr._id} deleteEntry={this.deleteEntry}/>;
                })
        );
    }
    deleteEntry(id){
        // conf
        
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
                <a href='/add'>Add New Entry</a>
                <h1>Entries Added</h1>    
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Blood Group</th>
                            <th>Age</th>
                            <th>Weight</th>
                            <th>Recent Donation</th>
                            <th>Contact</th>
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

