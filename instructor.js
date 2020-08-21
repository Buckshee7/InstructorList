
const Instructor = function(firstName, lastName, speciality, hasPet){
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
    this.hasPet = hasPet;
    this.votes = 0;
    this.ranking = calculateRanking();
};

// must be named function to allow hoisting into constructor
    // but this means it can't be a prototype and called as an object method later on. This is frustrating...
function calculateRanking() {
    return 1;
  };