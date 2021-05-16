const Normalize = require('./normalize')
const Random = require('./random')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class CSV {
    static getColumns() {
        return [
            { id: 'Show Id', title: 'Show Id' },  
            { id: 'Type', title: 'Type' }, 
            { id: 'Title', title: 'Title' }, 
            { id: 'Country', title: 'Country' }, 
            { id: 'Date Added', title: 'Date Added' }, 
            { id: 'Release Year', title: 'Release Year' }, 
            { id: 'Rating', title: 'Rating' }, 
            { id: 'Duration', title: 'Duration' }, 
            {id: 'Listed In', title: 'Listed In' } 
        ]
    }

    static createRowJSON (row) {
        const columns = CSV.getColumns().map(column => column.title)
        const rowJson = {}
            row.split(';').forEach((data, index) => {
                rowJson[columns[index]] = Normalize.removeSpecialCharacter(data)
            })
    
        return rowJson
    }

    static fillJSONEmptyValues(arrayWithCsvData){
        return arrayWithCsvData = arrayWithCsvData.map(rowData => {
            if (Normalize.isEmpty(rowData.Country)) {
                rowData.Country = Random.generateRandomCountry()
            }
    
            if (Normalize.isEmpty(rowData['Date Added'])) {
                rowData['Date Added'] = Random.generateRandomDateAdded()
            }
    
            if (Normalize.isEmpty(rowData['Rating'])) {
                rowData['Rating'] = Random.generateRandomRating()
            }
    
            return rowData
        })
    }


    static writeJSONDataArrayOnCsv(arrayWithCsvData, outputFilePath){
        createCsvWriter({
            path: outputFilePath,
            header: CSV.getColumns(),
            fieldDelimiter: ';'
        })
        .writeRecords(arrayWithCsvData)
        .then(()=> console.log('\nThe CSV file was written successfully!'));
    }

}

module.exports = CSV