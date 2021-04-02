import React from 'react';

import useManageData from './Logic/ManageData';
import FilterList from '../../components/Table/FilterList';
import './LandingPage.css';


// class component which will show donors list in a table, this is UI, logic is in Logic folder
export default function LandingPage() {
    const [
        Donor, filter, saveFilters,
        setIsFilterOn, setFilterData, showList
    ] = useManageData();

    let loading = (Donor === undefined) ? 
        ( <> Loading </> ) : 
        (
            <>
                <h1>Entries Added</h1>
                <section>
                    <div className='filterBox'>
                        <FilterList 
                        handleChange={filter} 
                        donorData={Donor} 
                        filter={saveFilters.current}/>
                        <button onClick={() => {
                            setIsFilterOn(false);
                            setFilterData();
                            saveFilters.current = {
                                name: '',
                                bloodGroup: '',
                                city: ''
                            };
                        }}>
                            Remove filter
                        </button>
                    </div>
                    { showList() }
                </section>
            </>
        );
    return (
        <div className='container'>
            {loading}
        </div>
    )
}

