const fsPromise = require('fs').promises
const Excel = require('exceljs')
const path = require('path')

async function excel2json (excelSheetName, jsonFileName) {
  const excel = new Excel.Workbook()
  const workbooks = await excel.xlsx.readFile(path.resolve(__dirname, 'excel', '20200514.xlsx'))
  const workbook = workbooks.getWorksheet(excelSheetName)
  const nameColKey = workbook.getColumn('A')
  const nameColVal = workbook.getColumn('D')
  const map = new Map()
  nameColKey.eachCell(function(cell, rowNumber) {
    const { value: key } = cell
    if (!map.get(key)) {
      map.set(key, [])
    }
    const arr = map.get(key)
    const value = nameColVal.values[rowNumber]
    if (Array.isArray(value)) {
      let val = ''
      value.forEach((item) => {
        val += item.text
      })
      arr.push(val)
    } else if (typeof value === 'string' || typeof value === 'number') {
      arr.push(value)
    }
  })
  const arr = []
  map.forEach((value, key) => {
    arr.push({
      classify: key,
      messages: value
    })
  })
  await fsPromise.writeFile(path.resolve(__dirname, 'json', jsonFileName), JSON.stringify(arr, null, 4)).catch((err) => {
    console.log('error', err)
    throw err
  })
  console.log('done')
}

module.exports = excel2json