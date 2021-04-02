// filter condition functions
function filterByBloodGroup(value){
    return (
        (person) => {
            if(value === '-' || value === ''){
                return 1;
            }
            return person.bloodGroup === value
        }
    )
}
function filterByName(value){
    return (
        (person) => {
            if(value === ''){
                return 1;
            }
            const lowerCaseFullName = person.first_name.toLowerCase() +
                person.middle_name.toLowerCase() +
                person.last_name.toLowerCase();
            const lowerCaseFilter = value.toLowerCase();
            
            return lowerCaseFullName.includes(lowerCaseFilter);
        }
    )
}
function filterByCity(value){
    return (
        (person) => {
            if(value === '-' || value === ''){
                return 1;
            }
            return person.city === value;
        }
    )
}

module.exports = {
    filterByName,
    filterByBloodGroup,
    filterByCity
}