import React from 'react';

// returns a row for a table with dynamic columns
const TableRow = function (props){
    return (
        <tr>
            {
                props.rowData.map(data => {
                    return props.isHeading? 
                        <th key={data+Math.random()}>{data}</th>: 
                        <td key={data+Math.random()}>{data}</td>;
                })
            }
        </tr>
    )
}

export default TableRow;