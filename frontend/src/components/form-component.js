import React, { Component } from 'react';
import axios from 'axios';
import '../css/form-style.css';

import { sortArray, getFormattedDate } from '../helper/functions';

export default class FormComponent extends Component{
    constructor(props){
        super(props);
        this.id = props.match.params.id;

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDonationDate = this.onChangeDonationDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBloodGroup = this.onChangeBloodGroup.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            dob: new Date(),
            gender: 'Male',
            weight: '',
            bloodGroup: 'A+',
            donationDate: new Date(),
            phoneNumber: '',
            email: '',
            address: ''
        }
    }
    bloodGroupArray = [
        'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
    ]
    componentDidMount(){
        if(this.id){
            axios.get('/donor/'+this.id)
                .then(res => {
                    console.log(res.data)
                    res.data.donationDate = sortArray(res.data.donationDate);
                    this.setState({
                        name: res.data.name,
                        dob: getFormattedDate(new Date(res.data.dateOfBirth)),
                        gender: res.data.gender,
                        weight: res.data.weight,
                        bloodGroup: res.data.bloodGroup,
                        donationDate: getFormattedDate(new Date(res.data.donationDate[res.data.donationDate.length-1])),
                        phoneNumber: res.data.phoneNumber,
                        email: res.data.email,
                        address: res.data.address
                    })
                })
        }
    }
    onChangeName(e){
        console.log(e.target.value);
        this.setState({
            name: e.target.value,
        })
    }
    onChangeDob(e){
        console.log(e.target.value);
        this.setState({
            dob: e.target.value,
        })
    }
    onChangeGender(e){
        console.log(e.target.value);
        this.setState({
            gender: e.target.value,
        })
    }
    onChangeWeight(e){
        console.log(e.target.value);
        this.setState({
            weight: e.target.value,
        })
    }
    onChangePhoneNumber(e){
        this.setState({
            phoneNumber: e.target.value,
        })
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangeBloodGroup(e){
        console.log(e.target.value);
        this.setState({
            bloodGroup: e.target.value,
        })
    }
    onChangeDonationDate(e){
        console.log(e.target.value);
        this.setState({
            donationDate: e.target.value,
        })
    }
    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        const info = {
            name: this.state.name,
            dateOfBirth: this.state.dob,
            gender: this.state.gender,
            weight: this.state.weight,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            bloodGroup: this.state.bloodGroup,
            donationDate: this.state.donationDate,
            address: this.state.address
        }
        console.log(info);
        alert(JSON.stringify(info));
        if(this.id){
            // axios.post('/donor/updateDetails/'+this.id, info)
            axios.post('/donor/updateDetails/'+this.id, info)
                .then(res => console.log(res.data.message))
                .catch(err => console.log(err));
        } else{
            axios.post('/donor/add', info)
                .then(res => console.log(res.data.message))
                .catch(err => console.log(err));
        }
    }
    render(){
        return(
            <div className='formContainer'>
                <a href='/'>Donors</a>
                <h2>Blood Donation Details</h2>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Personal Information</legend>
                        <section className='formSection'>
                            <label>
                                Name:
                            </label>
                            <input
                            name='name'
                            type='text'
                            placeholder='Enter Name'
                            className='formInput'
                            value={this.state.name}
                            onChange={this.onChangeName}
                            required />
                        </section>

                        <section className='formSection'>
                            <label>
                                Date Of Birth:
                            </label>
                            <input
                            name='dateOfBirth'
                            type='date'
                            className='formInput'
                            max={getFormattedDate()}
                            value={this.state.dob}
                            onChange={this.onChangeDob}
                            required />
                        </section>

                        <section className='formSection'>
                            <label>
                                Gender:
                            </label>
                            <select onChange={this.onChangeGender} className='formInput'>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
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
                    </fieldset>
                    <fieldset>
                        <legend>Donation Details</legend>
                        <section className='formSection'>
                            <label>
                                Latest Blood Donation Date:
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
                                Blood Group:
                            </label>
                            <select onChange={this.onChangeBloodGroup} value={this.state.bloodGroup} className='formInput'>
                                {this.bloodGroupArray.map(value => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </section>
                    </fieldset>

                    <fieldset>
                        <legend>Contact Details</legend>
                        <section className='formSection'>
                            <label>
                                Phone Number:
                            </label>
                            <input
                            name='phone number'
                            min='1000000000'
                            max='10000000000'
                            type='number'
                            placeholder='Enter Phone Number'
                            className='formInput'
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                            required />
                        </section>

                        <section className='formSection'>
                            <label>
                                Email:
                            </label>
                            <input
                            name='email'
                            type='email'
                            placeholder='someone@gmail.com'
                            className='formInput'
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            required />
                        </section>
                        
                        <section className='formSection'>
                            <label>
                                Address:
                            </label>
                            <textarea
                            name='address'
                            placeholder='Enter Address'
                            className='formInput'
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                            required></textarea>
                        </section>
                    </fieldset>


                    <section className='formSection'>
                        <input
                        value={this.id? 'update': 'submit'}
                        type='submit' />
                    </section>
                </form>
            </div>
        )
    }
} 