import React from 'react';

import TableRow from './TableRow';
import { sortArray, getAge } from '../../helper/functions';

// checks if the donor last donation date is more than 3 months old so that he can donate again
function isEligible(date){
    const lastDonationDate = new Date(date);
    const todayDate = new Date();
    let months = todayDate.getMonth()-lastDonationDate.getMonth() + 
        12*(todayDate.getFullYear() - lastDonationDate.getFullYear());
    if(todayDate.getDate() < lastDonationDate.getDate()){
        --months;
    }
    return months < 3 ? 'N' : 'Y'
}

// display a table containing dynamic rows
const DisplayListTable = function (props){
    return (
        <table>
            <thead>
                <TableRow
                    isHeading={true}
                    rowData={[ 
                        'Name', 'Blood Group', 'Age', 'Weight',
                        'Eligibility', 'City', 'Phone No.', 'Actions'
                    ]}
                />
            </thead>
                {console.log(props.donorData)}
            <tbody>
                {
                    props.donorData
                    .sort((donor1, donor2) => {
                        const date1 = new Date(donor1.donationDate[donor1.donationDate.length-1]);
                        const date2 = new Date(donor2.donationDate[donor2.donationDate.length-1]);
                        return (date2 - date1);
                    })
                    .map(donor => {
                        donor.donationDate = sortArray(donor.donationDate);
                        return (
                            <TableRow
                                isHeading={false}
                                key={donor._id} 
                                rowData={[
                                    (
                                        <a href={`/profile/${donor._id}`}>
                                            {`${donor.first_name} ${donor.middle_name} ${donor.last_name} (${donor.gender === 'Male'? 'M': 'F'})`}
                                        </a>
                                    ),
                                    donor.bloodGroup,
                                    getAge(donor.dateOfBirth),
                                    donor.weight,
                                    // new Date(donor.donationDate[donor.donationDate.length-1]).toDateString(),
                                    isEligible(donor.donationDate[donor.donationDate.length-1]),
                                    donor.city,
                                    donor.phoneNumber,
                                    (
                                        <>
                                            <a href={`/edit/${donor._id}`}>
                                                <button>
                                                    Edit
                                                </button>
                                            </a>
                                            <a href={`/edit/${donor._id}`}>
                                                <button>
                                                    View
                                                </button>
                                            </a>
                                            <button onClick={() => props.deleteEntry(donor._id)}>
                                                Delete
                                            </button>
                                        </>
                                    )
                                ]}
                            />
                        );
                    })
                }
            </tbody>
        </table>

    );
}

export default DisplayListTable;