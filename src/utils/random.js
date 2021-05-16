const faker = require('faker')

class Random {    
    static generateRandomCountry() {
        return faker.address.country()
    }

    static generateRandomDateAdded() {
        return faker.date.past()
    }

    static generateRandomRating() {
        return faker.random.word()
    }    
}

module.exports = Random