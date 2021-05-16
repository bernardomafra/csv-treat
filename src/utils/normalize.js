class Normalize {
    static removeSpecialCharacter (str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\'/g, '');
    }

    static isEmpty(data){ 
        return !data || data === ""
    }

    static getEmptyRowsByKeyInArray(key, array) {
        return array.filter((row) => Normalize.isEmpty(row[key]))
    }
}

module.exports = Normalize