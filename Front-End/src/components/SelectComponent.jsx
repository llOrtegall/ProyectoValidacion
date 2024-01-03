import Select from 'react-select'

const options = [
  { value: 'Impresora TMU USB/LPT', label: 'Impresora TMU | USB' },
  { value: 'Impresora Termica', label: 'Impresora Termica USB' },
  { value: 'Monitor / Pantalla', label: 'Monitor' },
  { value: 'Torre', label: 'Torre' },
  { value: 'Teclado', label: 'Teclado' },
  { value: 'Mouse / Raton', label: 'Mouse' },
  { value: 'Cámara', label: 'Cámara' },
  { value: 'Proyector', label: 'Proyector' },
  { value: 'PDA V1', label: 'PDA V1' },
  { value: 'PDA V2', label: 'PDA V2' },
  { value: 'CS10', label: 'PDA V3' },
  { value: 'NVR', label: 'NVR' },
  { value: 'Portátil', label: 'Portátil' },
  { value: 'Lector De Barras', label: 'Lector De Barras' },
  { value: 'Lector De Biometríco', label: 'Lector De Biometríco' },
  { value: 'UPS', label: 'UPS' },
  { value: 'Switch', label: 'Switch' },
  { value: 'Router', label: 'Router' },
  { value: 'Batería', label: 'Batería' },
  { value: 'Inversor', label: 'Inversor' },
  { value: 'Televisor', label: 'Televisor' },
  { value: 'Proyector', label: 'Proyector' }
]

const customStyles = {
  menuList: (provided) => ({
    ...provided,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: '10px',
    cursor: 'pointer'
  })
}

// eslint-disable-next-line react/prop-types
export function SelectComponent ({ fun }) {
  const handleChange = fun
  const handleSelectChange = (selectedOption) => {
    const e = {
      target: {
        name: 'nombre',
        value: selectedOption.value
      }
    }
    handleChange(e)
  }
  return (
    <Select options={options} styles={customStyles} onChange={handleSelectChange} />
  )
}
