class Logger { 
    static keyDataCountOfTotal(key, dataCount, totalCount) {
        console.log(`${dataCount} dados de ${totalCount} com ${key} vazio.`)
    }
}

module.exports = Logger