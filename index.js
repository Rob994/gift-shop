const readXlsxFile = require('read-excel-file/node');

// File path.
readXlsxFile('./data.xlsx').then((rows) => {
  console.log(rows)
})
