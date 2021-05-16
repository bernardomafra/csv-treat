const Normalize = require('./normalize')
const Random = require('./random')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class CSV {
    static getColumns() {
        return [
            { id: 'Show Id', title: 'Show Id', fakeMapper: '' },  
            { id: 'Type', title: 'Type', fakeMapper: 'name.jobType' }, 
            { id: 'Title', title: 'Title', fakeMapper: 'name.title' }, 
            { id: 'Country', title: 'Country', fakeMapper: 'address.country' }, 
            { id: 'Date Added', title: 'Date Added', fakeMapper: 'date.past' }, 
            { id: 'Release Year', title: 'Release Year', fakeMapper: 'date.past' }, 
            { id: 'Rating', title: 'Rating', fakeMapper: '' }, 
            { id: 'Duration', title: 'Duration', fakeMapper: '' }, 
            { id: 'Genders', title: 'Genders', fakeMapper: '' } 
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
        const columns = this.getColumns()

        return arrayWithCsvData = arrayWithCsvData.map(rowData => {
            columns.forEach(column => {
                if (Normalize.isEmpty(rowData[column.title])) {
                    rowData[column.title] = Random.generateDataByColumnName(column)
                }
            })
    
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