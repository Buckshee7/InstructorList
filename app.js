document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('#submit-button');
    submitButton.addEventListener('click', handleSubmit);

});

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)

    let hasPet = undefined;
    if (event.target.form.hasPetYes === false){
        haspet = false;
    } else{
        hasPet = true;
    };
    
    const newInstructor = new Instructor(
        event.target.form.firstName.value, 
        event.target.form.lastName.value,
        event.target.form.speciality.value,
        hasPet);
    
        console.log(newInstructor)
}