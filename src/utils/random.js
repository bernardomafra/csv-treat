const faker = require('faker')
const CSV = require("./csv")

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

    static generateDataByColumnName(column) {
        if (!column) return ""

        if (column.fakeMapper){
            const fakerData = column.fakeMapper.split('.') 
            return faker[fakerData[0]][fakerData[1]]()
        }

        return ""
    }
}

module.exports = Random