document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#new-instructor');
    form.addEventListener('submit', handleSubmit);

    const deleteAll = document.querySelector('#delete-all');
    deleteAll.addEventListener('click', handleDeleteAll);

});

let instructors = [];

const createNewInstructor = (event) => {
    // create newInstructor and add to instructors list

    //radios
    let hasPet = undefined;
    const hasPetRadios = document.querySelectorAll('.radio>input');
    hasPetRadios.forEach((radio) => {
      if (radio.checked) {
          hasPet = radio.value;
      };
    });

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

    // // create li elements
    const name = document.createElement('h3');
    const speciality = document.createElement('p');
    const pet = document.createElement('p');
    const ranking = document.createElement('p');
    const deleteButton = document.createElement('button');
    const voteButton = document.createElement('button');

    // // add values to li elements
    name.textContent = `Name: ${newInstructor.firstName} ${newInstructor.lastName}`;
    speciality.textContent = `Speciality: ${newInstructor.speciality}`;
    pet.textContent = `Has Pet(s): ${newInstructor.hasPet}`;
    ranking.textContent = `Instructor Ranking: ${newInstructor.ranking}`;
    deleteButton.textContent = "Delete Instructor";
    deleteButton.addEventListener('click', handleDeleteSingle);
    voteButton.textContent = "Upvote Instructor";
    voteButton.addEventListener('click', handleVote);

    // // add elements to li
    listElement.append(name);
    listElement.append(speciality);
    listElement.append(pet);
    listElement.append(ranking);
    listElement.append(voteButton);
    listElement.append(deleteButton);

    return listElement;
};

const getInstructorIndex = (event) => {
    const nameElement = event.target.parentNode.querySelector('h3').textContent;
    const fullName = nameElement.slice(6).split(" ");
    const firstName = fullName[0];
    const lastName = fullName[1];
    let instructorIndex;
    for (let i=0; i < instructors.length; i++){
        if (instructors[i].firstName === firstName && instructors[i].lastName === lastName){
            instructorIndex = i;
        };
    };
    return instructorIndex;
};

const recalculateRankings = () => {
    instructors.forEach((instructor) => {
        instructor.ranking = calculateRanking(instructor.votes);
    });
};

const refreshListElements = () => {
    const parentNode = document.querySelector('#instructors-list');
    parentNode.innerHTML = "";
    
    instructors.forEach((instructor) => {
        const listItem = createNewListItem(instructor);
        parentNode.append(listItem);
    });
}

const handleDeleteSingle = (event) => {
    event.target.parentNode.remove();

    //delete from instructors array
    const instructorIndex = getInstructorIndex(event);
    instructors.splice(instructorIndex, 1);

    recalculateRankings();
    refreshListElements();
};

const handleVote = (event) => {
    const instructorIndex = getInstructorIndex(event);
    instructors[instructorIndex].votes += 1;

    // recalculate rankings for every instructor
    recalculateRankings();

    //update the list elements to show new rankings
    refreshListElements();
};

const handleSubmit = (event) => {
    event.preventDefault();

    const newInstructor = createNewInstructor(event);

    const listItem = createNewListItem(newInstructor);

    // add li to parent node
    const parentNode = document.querySelector('#instructors-list');
    parentNode.append(listItem);

    event.target.reset();
};

const handleDeleteAll = () => {
    const parentNode = document.querySelector('#instructors-list');
    parentNode.innerHTML = "";
    instructors = [];
};