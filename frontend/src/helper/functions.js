// take date in any valid JS format and returns a persons age
const getAge = dob => {
    const birth_date = new Date(dob);
    const current_date = new Date();
    let age = current_date.getFullYear() - birth_date.getFullYear();
    if(
        current_date.getMonth() <= birth_date.getMonth() &&
        current_date.getDate() < birth_date.getDate()
        ){
            --age;
    }
    return age;
}

// takes a input date and return in YYYY-MM-DD format and 
// if empty input then returns todays date YYYY-MM-DD format
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

// takes an array of dates and sorts them
const sortArray = (array) => {
    return (
        array = array.sort((a, b) => {
            return new Date(a)-new Date(b);
        })
    );
}

// array to display dropdown for editing
const bloodGroupArray = [
    'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
]

export {
    sortArray,
    getAge,
    getFormattedDate,
    bloodGroupArray
};
