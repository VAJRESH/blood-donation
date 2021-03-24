import React from 'react';

import TableRow from './TableRow';
import { sortArray, getAge } from '../../helper/functions';

// display a table containing dynamic rows
const DisplayListTable = function (props){
    return (
        <table>
            <thead>
                <TableRow
                    isHeading={true}
                    rowData={[ 
                        'Name', 'Blood Group', 'Age', 'Weight', 'Amount (ml)',
                        'Recent Donation', 'Phone No.', 'Email', 'Actions'
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
                                    donor.donationAmount,
                                    new Date(donor.donationDate[donor.donationDate.length-1]).toDateString(),
                                    donor.phoneNumber,
                                    donor.email,
                                    (
                                        <>
                                            <a href={`/edit/${donor._id}`}>
                                                <button>
                                                    Edit
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