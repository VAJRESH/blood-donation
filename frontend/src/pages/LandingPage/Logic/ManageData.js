import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import DisplayListTable from '../../../components/Table/DisplayListTable';
import { filterByName, filterByBloodGroup, filterByCity } from '../Helper/filterFunctions'; 

// logic for landing page state management
const useManageData = () => {
    const [Donor, setDonor] = useState();
    const [filteredData, setFilterData] = useState();
    const [isFilterOn, setIsFilterOn] = useState(false);
    // variable to save the filter properties to apply to the original data each time it changes.
    const saveFilters = useRef({
        name: '',
        bloodGroup: '',
        city: ''
    });

    useEffect(() => {
        axios.get('/donor')
            .then(res => setDonor(res.data))
            .catch(err => console.log(err));
    }, []);
    
    function deleteEntryById(id){      
        axios.delete(`/donor/${id}`)
            .then(res => {
                console.log(res.data.message);
                setDonor(Donor.filter(person => person._id !== id))
            })
            .catch(err => console.log(err));
    }
    // this filter the table based on blood group and first name value
    function filter(field, e){
        if(field === 'first_name'){
            saveFilters.current.name = e.target.value;
        } else {
            saveFilters.current[field] = e.target.value;
        }
        // filters the original value with the filters applied
        setFilterData(
            Donor
            .filter(filterByName(saveFilters.current.name))
            .filter(filterByBloodGroup(saveFilters.current.bloodGroup))
            .filter(filterByCity(saveFilters.current.city))
        );
        setIsFilterOn(true);
    }
    // shows the table list and if no data the will show no data in whole row
    
    function showList(){
        if(isFilterOn){
            if(filteredData.length === 0){
                return (
                    <>
                        <DisplayListTable donorData={[]} />
                        <h1>No Data Found</h1>
                    </>
                )
            } else {
                return <DisplayListTable donorData={filteredData} deleteEntry={deleteEntryById}/>
            }
        }
        else {
            return <DisplayListTable donorData={Donor} deleteEntry={deleteEntryById}/>
        }
    }
    return [
        Donor, filter, saveFilters,
        setIsFilterOn, setFilterData, showList
    ];
}

export default useManageData;