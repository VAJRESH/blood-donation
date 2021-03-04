const getAge = dob => {
    const birth_date = new Date(dob);
    const current_date = new Date();

    return current_date.getFullYear() - birth_date.getFullYear();
}

const getFormattedDate = someDate => {
    const newDate = someDate? new Date(someDate): new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    const year = newDate.getFullYear();
    if(date<10){
        date = '0'+date;
    }
    if(month<10){
        month = '0'+month;
    }
    return `${year}-${month}-${date}`;
}

const sortArray = (array) => {
    return (
        array = array.sort((a, b) => {
            return new Date(a)-new Date(b);
        })
    );
}

export {
    sortArray,
    getAge,
    getFormattedDate
};
