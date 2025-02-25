import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Cerrar Sesión</h1>
      <p>¿Estás seguro de que deseas cerrar sesión?</p>
      <button onClick={() => { /* Add logout functionality here */ }}>
        Cerrar Sesión
      </button>
    </div>
  )
}

export default page