
const Instructor = function(firstName, lastName, speciality, hasPet){
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
    this.hasPet = hasPet;
    this.votes = 0;
    this.ranking = calculateRanking(this.votes);
};

// must be named function to allow hoisting into constructor
    // but this means it can't be a prototype and called as an object method later on. This is frustrating...
function calculateRanking(votes) {
    const rank = instructors.filter((instructor) => {
        return instructor.votes > votes;
    }).length + 1;
    return rank;
  };

Instructor.prototype.recalculateRank = () => {
    return calculateRanking(this.votes);
}