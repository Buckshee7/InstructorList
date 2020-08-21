document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#new-instructor');
    form.addEventListener('submit', handleSubmit);

});

const instructors = [];

const createNewInstructor = (event) => {
    // create newInstructor and add to instructors list

    let hasPet = undefined;
    if (event.target.hasPetYes === false){
        haspet = false;
    } else{
        hasPet = true;
    };

    const newInstructor = new Instructor(
        event.target.firstName.value, 
        event.target.lastName.value,
        event.target.speciality.value,
        hasPet);
    instructors.push(newInstructor);

    return newInstructor;
};

const createNewListItem = (newInstructor) => {
    // // create li
    const listElement = document.createElement('li')

    // // create li elemesnts
    const name = document.createElement('h3');
    const speciality = document.createElement('p');
    const pet = document.createElement('p');
    const ranking = document.createElement('p');
    const deleteButton = document.createElement('button')
    const voteButton = document.createElement('button')

    // // add values to li elements
    name.textContent = `Name: ${newInstructor.firstName} ${newInstructor.lastName}`;
    speciality.textContent = `Speciality: ${newInstructor.speciality}`;
    pet.textContent = `Has Pet(s): ${newInstructor.hasPet}`;
    ranking.textContent = `Instructor Ranking: ${newInstructor.ranking}`;
    deleteButton.textContent = "Delete Instructor";
    deleteButton.addEventListener('click', handleDeleteSingle);
    voteButton.textContent = "Upvote Instructor";
    voteButton.addEventListener('click', handleVote)

    // // add elements to li
    listElement.append(name) 
    listElement.append(speciality) 
    listElement.append(pet) 
    listElement.append(ranking) 
    listElement.append(voteButton) 
    listElement.append(deleteButton) 

    return listElement;
}

const handleDeleteSingle = () => {
  return "okay"
}

const handleVote = () => {
    return "okay"
  }

const handleSubmit = (event) => {
    event.preventDefault();

    const newInstructor = createNewInstructor(event);

    const listItem = createNewListItem(newInstructor);

    // add li to parent node
    const parentNode = document.querySelector('#instructors-list');
    parentNode.append(listItem);

    event.target.reset();
};

