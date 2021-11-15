import React, { useEffect, useState } from 'react';

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
  
    useEffect(() => {
      //obtener lista de bicicletas desde el backend
      setBicicletas(bicicletasBackend);
    }, []);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear Nueva Bicicleta');
          } else {
            setTextoBoton('Mostrar Todos los bicicletas');
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

            className='text-white bg-indigo-500 p-5 rounded-full m-6 w-28 self-end'
            >
              {textoBoton}
            </button>
          </div>
          {mostrarTabla ? (
            <TablaBicicletas listaBicicletas={bicicletas} />
          ) : (
            <FormularioCreacionBicicletas />
            )}
                </div>
  );
};

const TablaBicicletas = ({ listaBicicletas }) => {
    useEffect(() => {
      console.log('este es el listado de bicicletas en el componente de tabla', listaBicicletas);
    }, [listaBicicletas]);
    return (
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold text-gray-800'>Todos los bicicletas</h2>
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
  
  const FormularioCreacionBicicletas = () => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold text-gray-800'>Crear nueva bicicleta</h2>
        <form className='grid grid-cols-2'>
          <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type='text' />
          <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type='text' />
          <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type='text' />
          <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type='text' />
          <button className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'>
            Guardar bicicleta
          </button>
        </form>
      </div>
    );
  };
  
  export default Bicicletas;
