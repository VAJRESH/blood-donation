import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DisplayListTable from '../../components/Table/DisplayListTable';
import './LandingPage.css';

// class component which will show donors list in a table
export default function LandingPage() {
    const [Donor, setDonor] = useState();

    useEffect(() => {
        axios.get('/donor')
            .then(res => setDonor(res.data))
            .catch(err => console.log(err));
    }, []);
    
    function deleteEntryById(id){      
        axios.delete(`/donor/${id}`)
            .then(res => {
                console.log(res.data.message);
                alert(res.data.message);
                setDonor(Donor.filter(person => person._id !== id))
            })
            .catch(err => console.log(err));
    }
    let loading = (Donor === undefined) ? 
        ( <> Loading </> ) : 
        (
            <>
                <h1>Entries Added</h1>
                <DisplayListTable donorData={Donor || []} deleteEntry={deleteEntryById}/>
            </>
        );
    return (
        <div className='container'>
            {loading}
        </div>
    )
}

