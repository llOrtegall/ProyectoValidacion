import { connection, connection2 } from '../db.js'
import { Builder, By } from 'selenium-webdriver'

async function webScraping(cedula) {
  const driver = await new Builder().forBrowser('chrome').build()
  driver.get('https://muisca.dian.gov.co/WebRutMuisca/DefConsultaEstadoRUT.faces')
  await driver
    .findElement(
      By.xpath('//input[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:numNit"]')
    ).sendKeys(cedula)
  await driver
    .findElement(By.xpath('//input[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:btnBuscar"]')
    ).click()
  const apellido = await driver.findElement(By.xpath('//span[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:primerApellido"]')).getText()
  const nombre = await driver.findElement(By.xpath('//span[@id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:primerNombre"]')).getText()
  await driver.quit()
  return { apellido, nombre }
}

function contieneAlMenosNPalabras(cadena1, cadena2, n) {
  const palabras1 = cadena1.split('')
  const palabrasEnComun = palabras1.filter(palabra => cadena2.includes(palabra))
  return palabrasEnComun.length >= n
}

export const getValidacion = async (req, res) => {
  // TODO: Esta es la data desde Chat Boot
  const [result] = await connection.query('SELECT * FROM personayumbo')
  const [result2] = await connection2.query('SELECT * FROM cliente')
  const resultCedula1 = result.map(item => item.cedula)
  const resultCedula2 = result2.map(item => item.cedula)
  const UsuariosNoCreados = resultCedula1.filter(item => !resultCedula2.includes(item))
  const stringCedula = UsuariosNoCreados[0].toString()
  webScraping(stringCedula)
    .then(({ apellido, nombre }) => {
      const resultado = { apellido, nombre }
      validarResultado(resultado)
    })
    .catch((err) => { throw err })
  function validarResultado(resultado) {
    const nombreCompleto = resultado.apellido + ' ' + resultado.nombre
    const ValidarNombreRegChatBoot = result[0].nombre
    const ncLower = nombreCompleto.toLowerCase()
    const vnLower = ValidarNombreRegChatBoot.toLowerCase()
    const numeroMinimoDePalabras = 2
    const resultado2 = contieneAlMenosNPalabras(ncLower, vnLower, numeroMinimoDePalabras)
    if (resultado2) {
      res.status(200).json('Usuario Creado Automaticamente')
    } else {
      res.status(404).json('Usuario No Creado')
    }
  }
}

export const newValidacion = async (req, res) => {
  try {
    const { data } = req.body
    console.log(data)
    res.status(200).send('Tarea completada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la tarea programada');
  }
}