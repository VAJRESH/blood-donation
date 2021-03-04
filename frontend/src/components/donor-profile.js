import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { sortArray, getAge, getFormattedDate } from '../helper/functions';

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.id = props.match.params.id;

        this.state = {
            person:'', 
            age: 0
        }
        this.donationDates = this.donationDates.bind(this);
    }
    componentDidMount(){
        axios.get('/donor/'+this.id)
            .then(res => {
                res.data.donationDate = sortArray(res.data.donationDate)
                this.setState({
                    person: res.data
                });
            })
            .catch(err => console.log(err));
    }
    donationDates(){
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 'November', 'December'
        ]
        if(this.state.person !== ''){
            let i = this.state.person.donationDate.length-1;
            let j = i - 2;
            const displayDates = [];
            for(i; i>j; --i){
                let dateObj = new Date(this.state.person.donationDate[i]);
                let year = dateObj.getFullYear();
                let month = months[dateObj.getMonth()];
                let date = dateObj.getDate();
                if(month){
                    displayDates.push(`${year} ${month} ${date}`);
                }
            }
            return (
                displayDates.map(dates => {
                    return (
                        <p key={dates+Math.random()}>{dates}</p>
                    );
                })
            )
        }
    }
    render() {
        return (
            <div>
                <p>{console.log(this.state.person)}</p>
                <section className='profile-section'>
                    <h2>Personal Details</h2>
                    <p><strong>Name: </strong>{this.state.person.name}</p>
                    <p><strong>Gender: </strong>{this.state.person.gender}</p>
                    <p><strong>Weight: </strong>{this.state.person.weight}</p>
                    <p><strong>Date Of Birth: </strong>{getFormattedDate(this.state.person.dateOfBirth)}</p>
                    {
                        this.state.person &&
                        <p><strong>Age: </strong>{getAge(this.state.person.dateOfBirth)}</p>}
                    <p><strong>Blood Group: </strong>{this.state.person.bloodGroup}</p>
                </section>
                <section className='profile-section'>
                    <h2>Contact Info</h2>
                    <p><strong>Address: </strong>{this.state.person.address}</p>
                    <p><strong>Phone Number: </strong>{this.state.person.phoneNumber}</p>
                    <p><strong>Email: </strong>{this.state.person.email}</p>
                </section>
                <section className='profile-section'>
                    <h2>Donation Date</h2>
                    {this.donationDates()}
                    <Link to={`/donation/${this.id}`}>Add New Entry</Link>
                </section>
                <section>
                    <Link to={`/edit/${this.id}`}>
                        <button>Update Details</button>
                    </Link>
                </section>
            </div>
        );
    }
}

export default Profile;