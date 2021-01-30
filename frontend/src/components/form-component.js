import React, { Component } from 'react';
import '../css/form-style.css'

export default class FormComponent extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeDonationDate = this.onChangeDonationDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBloodGroup = this.onChangeBloodGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            dob: new Date(),
            gender: '',
            weight: '',
            bloodGroup: '',
            donationDate: new Date()

        }
    }
    bloodGroupArray = [
        'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
    ]
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
    onSubmit(e){
        e.preventDefault();
        console.log('Form Submitted!!');
    }
    render(){
        return(
            <div className='formContainer'>
                <h2>Blood Donation Details</h2>
                <form onSubmit={this.onSubmit}>
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
                        placeholder='Enter Weight'
                        className='formInput'
                        value={this.state.weight}
                        onChange={this.onChangeWeight}
                        required />
                    </section>

                    <section className='formSection'>
                        <label>
                            Blood Group:
                        </label>
                        <select onChange={this.onChangeBloodGroup} className='formInput'>
                            {this.bloodGroupArray.map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </section>

                    <section className='formSection'>
                        <label>
                            Blood Donation Date:
                        </label>
                        <input
                        name='BloodDonationDate'
                        type='date'
                        className='formInput'
                        value={this.state.donationDate}
                        onChange={this.onChangeDonationDate}
                        required />
                    </section>

                    <section className='formSection'>
                        <input
                        value='submit'
                        type='submit' />
                    </section>
                </form>
            </div>
        )
    }
} 