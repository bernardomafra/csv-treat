const csvFilePath = 'netflix_titlesOriginal.csv'

const csvToJson = require('csvtojson')

const Logger = require('./utils/logger')
const Normalize = require('./utils/normalize')
const CSV = require('./utils/csv')

function checkAndLogEmptyValuesCount(arrayWithCsvData) {
    const columns = CSV.getColumns()
    columns.forEach(column => {
        const linesWithoutThisColumn = Normalize.getEmptyRowsByKeyInArray(column.title, arrayWithCsvData)
        Logger.keyDataCountOfTotal(column.title, linesWithoutThisColumn.length, arrayWithCsvData.length)
    })
}

csvToJson({ output: "line", noheader: false })
.fromFile(csvFilePath)
.then((jsonObject) => {
    let arrayWithCsvData = jsonObject.map(row => CSV.createRowJSON(row))

    console.log('\n=============== ANTES DE TRATAR OS DADOS ==================')
    checkAndLogEmptyValuesCount(arrayWithCsvData)

    arrayWithCsvData = CSV.fillJSONEmptyValues(arrayWithCsvData)

    console.log('\n=============== DEPOIS DE TRATAR OS DADOS ==================')
    checkAndLogEmptyValuesCount(arrayWithCsvData)

    CSV.writeJSONDataArrayOnCsv(arrayWithCsvData, 'netflix_titlesSolved.csv')
})

