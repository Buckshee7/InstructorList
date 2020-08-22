document.addEventListener('DOMContentLoaded', () => {
    refreshListElements();

    const form = document.querySelector('#new-instructor');
    form.addEventListener('submit', handleSubmit);

    const deleteAll = document.querySelector('#delete-all');
    deleteAll.addEventListener('click', handleDeleteAll);

    const addSpecialityButton = document.querySelector('#add-speciality');
    addSpecialityButton.addEventListener('click', handleAddSpeciality);

    const populateButton = document.querySelector('#populate');
    populateButton.addEventListener('click', handlePopulate)
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
    const listElement = document.createElement('li');
    listElement.classList = "singleInstructor";

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
    voteButton.textContent = "Up-Vote Instructor";
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

    if (instructors.length === 0){
        const h3 = document.createElement('h3');
        h3.innerHTML = 'No Instructors to Display :('
        parentNode.append(h3);
    } else {
        instructors.forEach((instructor) => {
            const listItem = createNewListItem(instructor);
            parentNode.append(listItem);
        });
    };
};

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

    createNewInstructor(event);

    refreshListElements();

    event.target.reset();
};

const handleDeleteAll = () => {
    const parentNode = document.querySelector('#instructors-list');
    parentNode.innerHTML = "";
    instructors = [];
    refreshListElements();
};

const addNewOption = (event) => {
    const option = document.createElement('option')
    option.value = event.target.value
    option.innerHTML = event.target.value
    const parentNode = document.querySelector('#speciality')
    parentNode.append(option)
};

const handleSubmitSpeciality = (event) => {
    // event.preventDefault()
    // this stops the form validation of required fields happening 
        // it seems to act like a submit button
        // this also stops it updating the input filed with the key pressed :(
            // fixed by putting in the if statement :D
    
    if (event.key === "Enter") {
        event.preventDefault();
        addNewOption(event);

        // reset this part of form
        event.target.parentNode.innerHTML = "";
        
        const parentNode = document.querySelector('#new-speciality');
        parentNode.append(addSpecialityButton);
    };
};

// need to declare this outside of function so it can be used in both handleAddSpeciality and handleSubmitSpeciality
let addSpecialityButton;

const handleAddSpeciality = (event) => {

    const parentNode = document.querySelector('#new-speciality');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.htmlFor = "new-spesh";
    label.innerHTML = "New Speciality";
    input.id = "new-spesh";
    input.type = "text";
    input.placeholder = "Press Enter to Submit";
    input.addEventListener('keydown', handleSubmitSpeciality);
    
    parentNode.append(label);
    parentNode.append(input);

    addSpecialityButton = document.querySelector('#add-speciality');
    addSpecialityButton.remove();
    
};

const handlePopulate = () => {
    const ally = new Instructor("Ally", "McGilloway", "Card Tricks", true, 2);
    const katie = new Instructor("Katie", "Jeffree", "Musical Statues", false, 1);
    const jen = new Instructor("Jenn", "Ramsay", "Taking Regular Breaks", true, 1);
    const jarrod = new Instructor("Jarrod", "Bennie", "Abandoning Ship", false, 0);
    instructors.push(ally);
    instructors.push(katie);
    instructors.push(jen);
    instructors.push(jarrod);


    console.log(ally);

    createNewListItem(ally)
    createNewListItem(katie)
    createNewListItem(jen)
    createNewListItem(jarrod)

    recalculateRankings();
    refreshListElements();
};