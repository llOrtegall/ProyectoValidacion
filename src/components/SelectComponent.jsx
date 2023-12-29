import Select from 'react-select';

const options = [
  { value: 'Monitor / Pantalla', label: 'Monitor' },
  { value: 'Torre', label: 'Torre' },
  { value: 'Teclado', label: 'Teclado' },
  { value: 'Mouse / Raton', label: 'Mouse' },
  { value: 'Impresora TMU USB/LPT', label: 'Impresora TMU | USB' },
  { value: 'Impresora Termica', label: 'Impresora Termica USB' },
  { value: 'Cámara', label: 'Cámara' },
  { value: 'Proyector', label: 'Proyector' },
];

const customStyles = {
  menuList: (provided) => ({
    ...provided,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: '10px',
  }),
};


// eslint-disable-next-line react/prop-types
export function SelectComponent({ fun }) {

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
  );
}