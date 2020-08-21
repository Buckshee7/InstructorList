
const Instructor = function(firstName, lastName, speciality, hasPet){
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
    this.hasPet = hasPet;
    this.votes = 0;
    this.ranking = calculateRanking
};

// must be named function to allow hoisting into constructor
function calculateRanking() {
    return 1;
  };