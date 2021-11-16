import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no

const bicicletasBackend = [
    {
      tipo: 'MTB',
      marca: 'Cannondale',
      modelo: 2020,
    },
    {
      tipo: 'Ruta',
      marca: 'Specialized',
      modelo: 2019,
    },
    {
      tipo: 'Híbrida',
      marca: 'Trek',
      modelo: 2021,
    },
    {
      tipo: 'Urbanas',
      marca: 'Pinarello',
      modelo: 2018,
    },
    {
      tipo: 'BMX',
      marca: 'GT',
      modelo: 2021,
    },
    {
      tipo: 'Pista',
      marca: 'Giant',
      modelo: 2017,
    },

  ];
  
  const Bicicletas = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [bicicletas, setBicicletas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nueva Bicicleta');
    const [colorBoton, setColorBoton] = useState('indigo');
  
    useEffect(() => {
      //obtener lista de bicicletas desde el backend
      setBicicletas(bicicletasBackend);
    }, []);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear Nueva Bicicleta');
            setColorBoton('indigo');
          } else {
            setTextoBoton('Mostrar Todas las bicicletas');
            setColorBoton('green');
        }
    }, [mostrarTabla]);

    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Página de administración de bicicletas
          </h2>
          <button
            onClick={() => {
              setMostrarTabla(!mostrarTabla);
            }}

            className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
            >
              {textoBoton}
            </button>
          </div>
          {mostrarTabla ? (
            <TablaBicicletas listaBicicletas={bicicletas} />
          ) : (
            <FormularioCreacionBicicletas
            setMostrarTabla={setMostrarTabla}
            listaBicicletas={bicicletas}
            setBicicletas={setBicicletas}
          />
            )}
            <ToastContainer position='bottom-center' autoClose={5000} />
                </div>
  );
};

const TablaBicicletas = ({ listaBicicletas }) => {
    useEffect(() => {
      console.log('este es el listado de bicicletas en el componente de tabla', listaBicicletas);
    }, [listaBicicletas]);
    return (
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold text-gray-800'>Todas las bicicletas</h2>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
            </tr>
          </thead>
          <tbody>
            {listaBicicletas.map((bicicleta) => {
              return (
                <tr>
                  <td>{bicicleta.tipo}</td>
                  <td>{bicicleta.marca}</td>
                  <td>{bicicleta.modelo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const FormularioCreacionBicicletas = ({ setMostrarTabla, listaBicicletas, setBicicletas }) => {
    const form = useRef(null);
  
    const submitForm = (e) => {
      e.preventDefault();
      const fd = new FormData(form.current);
  
      const nuevaBicicleta = {};
      fd.forEach((value, key) => {
        nuevaBicicleta[key] = value;
      });
  
      setMostrarTabla(true);
      setBicicletas([...listaBicicletas, nuevaBicicleta]);
      // identificar el caso de éxito y mostrar un toast de éxito
      toast.success('Bicicleta agregado con éxito');
      // identificar el caso de error y mostrar un toast de error
      // toast.error('Error creando un bicicleta');
    };
  

    return (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-2xl font-extrabold text-gray-800'>Crear nueva Bicicleta</h2>
          <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='tipo'>
          Tipo
          <input
            name='tipo'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='MTB'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Marca
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='marca'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Cannondale</option>
            <option>Specialized</option>
            <option>Trek</option>
            <option>Pinarello</option>
            <option>GT</option>
            <option>Giant</option>
          </select>
        </label>
        <label className='flex flex-col' htmlFor='modelo'>
          Modelo 
          <input
            name='modelo'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1992}
            max={2022}
            placeholder='2020'
            required
          />
        </label>

        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar bicicleta
        </button>
      </form>
    </div>
  );
};
export default Bicicletas;