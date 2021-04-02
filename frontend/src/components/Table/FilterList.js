import React from 'react';

import { bloodGroupArray } from '../../helper/functions';

const FilterList = props => {
    let cities = [];
    for(let data of props.donorData){
        cities.push(data.city);
    }
    cities = [...new Set(cities)];
    return (
        <>
            <h1>Filters</h1>
            <div>
                <input 
                    type='search'
                    placeholder='Search by Name'
                    value={props.filter.name || ''}
                    onChange={(e) => props.handleChange('first_name', e)} 
                />
            </div>
            <div>
                <label>Blood Group</label>
                <select onChange={(e) => props.handleChange('bloodGroup', e)} value={props.filter.bloodGroup || '-'}>
                    <option>-</option>
                    {
                        bloodGroupArray.map((bloodGroup) => {
                            return (
                                <option value={bloodGroup} key={bloodGroup} >
                                    {bloodGroup}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label>City</label>
                <select onChange={(e) => props.handleChange('city', e)} value={props.filter.city || '-'}>
                    <option>-</option>
                    {
                        cities.map((city, index) => {
                            return (
                                <option value={city} key={index} >
                                    {city}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        </>
    );
}

export default FilterList;
