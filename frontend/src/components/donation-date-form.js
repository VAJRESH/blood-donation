import React, { Component } from 'react';
import axios from 'axios';

import { getFormattedDate } from '../helper/functions';

class DonationDate extends Component {
    constructor(props){
        super(props);
        this.id = props.match.params.id;

        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeDonationDate = this.onChangeDonationDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            gender: 'Male',
            weight: '',
            bloodGroup: 'A+',
            donationDate: new Date(),
            lastDonationDates: '',
            phoneNumber: '',
            email: '',
        }
    }
    componentDidMount(){
        if(this.id){
            axios.get('/donor/'+this.id)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        name: res.data.name,
                        gender: res.data.gender,
                        weight: res.data.weight,
                        lastDonationDate: res.data.donationDate,
                        bloodGroup: res.data.bloodGroup,
                        phoneNumber: res.data.phoneNumber,
                        email: res.data.email,
                    })
                })
        }
    }
    onChangeWeight(e){
        console.log(e.target.value);
        this.setState({
            weight: e.target.value,
        })
    }
    onChangeDonationDate(e){
        console.log(e.target.value);
        this.setState({
            donationDate: e.target.value,
        })
    }
    onSubmit(e){
        e.preventDefault();
        const info = {
            weight: this.state.weight,
            donationDate: this.state.donationDate,
        }
        console.log(info);
        alert(JSON.stringify(info));

        axios.post('/donor/addDate/'+this.id, info)
            .then(res => console.log(res.message))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className='formContainer'>
                <a href='/'>Donors</a>
                <h2>New Blood Donation Date</h2>
                <section>
                    {console.log(this.state)}
                </section>
                <form onSubmit={this.onSubmit}>
                    <section className='formSection'>
                        <label>
                            Blood Donation Date:
                        </label>
                        <input
                        name='BloodDonationDate'
                        type='date'
                        className='formInput'
                        max={getFormattedDate()}
                        value={this.state.donationDate}
                        onChange={this.onChangeDonationDate}
                        required />
                    </section>
                    <section className='formSection'>
                        <label>
                            Weight:
                        </label>
                        <input
                        name='weight'
                        type='number'
                        min='40'
                        max='200'
                        placeholder='Enter Weight'
                        className='formInput'
                        value={this.state.weight}
                        onChange={this.onChangeWeight}
                        required />
                    </section>
                    <section className='formSection'>
                        <input
                        value='Add New Entry'
                        type='submit' />
                    </section>
                </form>
            </div>
        );
    }
}

export default DonationDate;
