import { connection, connection2 } from '../db.js'
import { Builder, By } from 'selenium-webdriver'

async function webScraping() {
  const driver = await new Builder().forBrowser('chrome').build()
  driver.get('https://muisca.dian.gov.co/WebRutMuisca/DefConsultaEstadoRUT.faces')

  await driver
    .findElement(
      By.xpath('//input[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:numNit"]')
    ).sendKeys('1118307852')

  await driver
    .findElement(By.xpath('//input[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:btnBuscar"]')
    ).click()

  const apellido = await driver.findElement(By.xpath('//span[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:primerApellido"]')).getText()
  const nombre = await driver.findElement(By.xpath('//span[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:primerNombre"]')).getText()
  return { apellido, nombre }
}

export const getValidacion = async (req, res) => {
  // TODO: Esta es la data desde Chat Boot
  const [result] = await connection.query('SELECT * FROM personayumbo')
  const [result2] = await connection2.query('SELECT * FROM cliente')

  const resultCedula1 = result.map(item => item.cedula)
  const resultCedula2 = result2.map(item => item.cedula)

  const areEqual = resultCedula1.length === resultCedula2.length && resultCedula1.every((value, index) => value === resultCedula2[index])

  console.log(areEqual)

  // Crear un nuevo array que contenga elementos que no estén en ambos arrays
  const elementosDiferentes = resultCedula1.concat(resultCedula2)
    .filter(item => !resultCedula1.includes(item) || !resultCedula2.includes(item))

  console.log(elementosDiferentes)

  console.log(webScraping().then((apellido, nombre) => {
    console.log(apellido)
    console.log(nombre)
  }))
}
