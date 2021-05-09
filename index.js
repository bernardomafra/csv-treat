const csvFilePath='netflix_titlesOriginal.csv'

const csv=require('csvtojson')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const faker = require('faker')

function removeSpecialCharacter (str) {

    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\'/g, '');
}

// Transformar o arquivo csv em JSON
csv({output:"line", noheader: false})
.fromFile(csvFilePath)
.then((jsonObject)=>{
    const columns = [
        'Show Id', 
        'Type',
        'Title',
        'Country',
        'Date Added',
        'Release Year',
        'Rating',
        'Duration',
        'Listed In'
    ]

    // Percorrer o JSON e para cada linha, que é uma String, 
    // separar os valores pelo delimitador ';' construir um objeto com os dados (rowJson)
    let arrayWithCsvData = []

    jsonObject.forEach(row => {
        const rowJson = {}
        row.split(';').forEach((data, index) => {
            rowJson[columns[index]] = removeSpecialCharacter(data)
        })
        arrayWithCsvData.push(rowJson)
    })

    console.log('\n=============== ANTES DE TRATAR OS DADOS ==================')

    let linesFoundWithoutCountry = arrayWithCsvData.filter((nor) => nor.Country === "")
    let linesFoundWithoutDateAdded = arrayWithCsvData.filter((nor) => nor['Date Added'] === "")
    let linesFoundWithoutRating = arrayWithCsvData.filter((nor) => nor['Rating'] === "")

    console.log(linesFoundWithoutCountry.length, 'dados de', arrayWithCsvData.length, "com 'Country' vazio." )
    console.log(linesFoundWithoutDateAdded.length, 'dados de', arrayWithCsvData.length, "com 'Date Added' vazio." )
    console.log(linesFoundWithoutRating.length, 'dados de', arrayWithCsvData.length, "com 'Rating' vazio." )
    
    // Percorrer o vetor com todos os dados do csv adicionando valores aleatorios 
    // para as colunas que faltam dados
    arrayWithCsvData = arrayWithCsvData.map(data => {
        if (data.Country === "") {
            data.Country = faker.address.country()
        }

        if (data['Date Added'] === "") {
            data['Date Added'] = faker.date.past()
        }

        if (data['Rating'] === "") {
            data['Rating'] = faker.random.word()
        }

        return data
    })

    console.log('\n=============== DEPOIS DE TRATAR OS DADOS ==================')
    
    linesFoundWithoutCountry = arrayWithCsvData.filter((nor) => nor.Country === "")
    linesFoundWithoutDateAdded = arrayWithCsvData.filter((nor) => nor['Date Added'] === "")
    linesFoundWithoutRating = arrayWithCsvData.filter((nor) => nor['Rating'] === "")

    console.log(linesFoundWithoutCountry.length, 'dados de', arrayWithCsvData.length, "com 'Country' vazio." )
    console.log(linesFoundWithoutDateAdded.length, 'dados de', arrayWithCsvData.length, "com 'Date Added' vazio." )
    console.log(linesFoundWithoutRating.length, 'dados de', arrayWithCsvData.length, "com 'Rating' vazio." )


    // Escrever o resultado tratado no arquivo csv 'netflix_titlesSolved.csv' 
    const csvWriter = createCsvWriter({
        path: 'netflix_titlesSolved.csv',
        header: [
            { id: 'Show Id', title: 'Show Id' },  
            { id: 'Type', title: 'Type' }, 
            { id: 'Title', title: 'Title' }, 
            { id: 'Country', title: 'Country' }, 
            { id: 'Date Added', title: 'Date Added' }, 
            { id: 'Release Year', title: 'Release Year' }, 
            { id: 'Rating', title: 'Rating' }, 
            { id: 'Duration', title: 'Duration' }, 
            {id: 'Listed In', title: 'Listed In' } 
        ],
        fieldDelimiter: ';'
      });

      csvWriter
      .writeRecords(arrayWithCsvData)
      .then(()=> console.log('The CSV file was written successfully'));
})

