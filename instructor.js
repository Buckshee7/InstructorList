const Instructor = function(firstName, lastName, speciality, hasPet, internetQuality, rating){
    this.firstName = firstName;
    this.lastName = lastName;
    this.speciality = speciality;
    this.hasPet = hasPet;
    this.internetQuality = internetQuality;
    this.rating = rating;
}

module.exports = Instructor;