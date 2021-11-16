import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no

const bicicletasBackend = [
    {
      nombre: 'Corolla',
      marca: 'Toyota',
      modelo: 2014,
    },
    {
      nombre: 'Sandero',
      marca: 'Renault',
      modelo: 2020,
    },
    {
      nombre: 'Rav4',
      marca: 'Toyota',
      modelo: 2021,
    },
    {
      nombre: 'Fiesta',
      marca: 'Ford',
      modelo: 2017,
    },
    {
      nombre: 'Mazda 3',
      marca: 'Mazda',
      modelo: 2020,
    },
    {
      nombre: 'Chevrolet',
      marca: 'Onix',
      modelo: 2020,
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
              <th>Nombre de la bicicleta</th>
              <th>Marca de la bicicleta</th>
              <th>Modelo de la bicicleta</th>
            </tr>
          </thead>
          <tbody>
            {listaBicicletas.map((bicicleta) => {
              return (
                <tr>
                  <td>{bicicleta.nombre}</td>
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
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre de la bicicleta
          <input
            name='nombre'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Corolla'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Marca de la bicicleta
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='marca'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Renault</option>
            <option>Toyota</option>
            <option>Ford</option>
            <option>Mazda</option>
            <option>Chevrolet</option>
          </select>
        </label>
        <label className='flex flex-col' htmlFor='modelo'>
          Modelo de la bicicleta
          <input
            name='modelo'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1992}
            max={2022}
            placeholder='2014'
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