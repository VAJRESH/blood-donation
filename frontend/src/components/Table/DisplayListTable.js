import React from 'react';
import { Link } from 'react-router-dom';

import TableRow from './TableRow';
import { sortArray, getAge } from '../../helper/functions';
import ExportListInPdf from './ExportListInPdf';

// checks if the donor last donation date is more than 3 months old so that he can donate again
function isEligible(date){
    const lastDonationDate = new Date(date);
    const todayDate = new Date();
    let months = todayDate.getMonth()-lastDonationDate.getMonth() + 
        12*(todayDate.getFullYear() - lastDonationDate.getFullYear());
    if(todayDate.getDate() < lastDonationDate.getDate()){
        --months;
    }
    return months < 3 ? 'No' : 'Yes'
}

function generateRowData(props){
    const returnRowData = [[ 
        'Name', 'Blood Group', 'Age', 'Weight',
        'Eligible', 'City', 'Phone No.', 'Actions'
    ]];
    props.donorData
    .sort((donor1, donor2) => {
        const date1 = new Date(donor1.donationDate[donor1.donationDate.length-1]);
        const date2 = new Date(donor2.donationDate[donor2.donationDate.length-1]);
        return (date1 - date2);
    })
    .map(donor => {
        donor.donationDate = sortArray(donor.donationDate);
        return ( returnRowData.push([
            `${donor.first_name} ${donor.middle_name} ${donor.last_name} (${donor.gender === 'Male'? 'M': 'F'})`,
            donor.bloodGroup,
            getAge(donor.dateOfBirth),
            donor.weight,
            isEligible(donor.donationDate[donor.donationDate.length-1]),
            donor.city,
            donor.phoneNumber,
            (
                <div className='actionBox'>
                    <Link to={`/profile/${donor._id}`}>
                        <button>
                            <i className="fas fa-user"></i>
                        </button>
                    </Link>
                    <Link to={`/donation/${donor._id}`}>
                        <button>
                            <i className="fas fa-plus-circle"></i>
                        </button>
                    </Link>
                    <Link to={{
                        pathname: `/profile/${donor._id}`,
                        state: true
                    }}>
                        <button>
                            <i className="fas fa-edit"></i>
                        </button>
                    </Link>
                    <button onClick={() => props.deleteEntry(donor._id)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            )
        ]));
    })
    return returnRowData;
} 

// display a table containing dynamic rows
const DisplayListTable = function (props){
    const rowData = generateRowData(props);
    return (
        <>
            <button className='downloadBtn' onClick={() => ExportListInPdf(rowData)} >
                <i className="fas fa-download"></i>
                <span>Download</span>
            </button>
            <table>
                <thead>
                    <TableRow
                        isHeading={true}
                        rowData={rowData[0]}
                    />
                </thead>
                <tbody>
                    {
                        rowData
                        .map((donor, index) => {
                            if(index === 0) return null;
                            return (
                                <TableRow
                                    isHeading={false}
                                    key={index+Math.random()} 
                                    rowData={donor}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default DisplayListTable;