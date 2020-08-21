document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('#submit-button');
    submitButton.addEventListener('click', handleSubmit);

});

const instructors = [];

const handleDeleteSingle = () => {
  return "okay"
}

const handleVote = () => {
    return "okay"
  }

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
    
    //create new list item
        // define parent element
        const parentNode = document.querySelector('#instructors-list')

        // create li
        const listElement = document.createElement('li')

        // create li elements
        const name = document.createElement('h3');
        const speciality = document.createElement('p');
        const pet = document.createElement('p');
        const ranking = document.createElement('p');
        const deleteButton = document.createElement('button')
        const voteButton = document.createElement('button')

        // add values to li elements
        name.textContent = `Name: ${newInstructor.firstName} ${newInstructor.lastName}`;
        speciality.textContent = `Speciality: ${newInstructor.speciality}`;
        pet.textContent = `Has Pet(s): ${newInstructor.hasPet}`;
        ranking.textContent = `Instructor Ranking: ${newInstructor.ranking}`;
        deleteButton.textContent = "Delete Instructor";
        deleteButton.addEventListener('click', handleDeleteSingle);
        voteButton.textContent = "UpVote Instructor";
        voteButton.addEventListener('click', handleVote)

        // add elements to li
        listElement.append(name) 
        listElement.append(speciality) 
        listElement.append(pet) 
        listElement.append(ranking) 
        listElement.append(voteButton) 
        listElement.append(deleteButton) 

        // add li to parent
        parentNode.append(listElement)


        console.log(newInstructor)
}

