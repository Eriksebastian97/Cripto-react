import { useState , useEffect } from "react";
import styled from "@emotion/styled"; //paquete para usar styles components
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import ImagenCripto from "./img/imagen-criptos.png";

//estilos con style componentes
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 35px;
 
  //pseudoelementos

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 12px auto 0 auto;
  }
`;



function App() {

//arrancamos con objeto vacio si pasamos la validacion se va llenar esos objetos con los valores seleccionados
const [monedas,setMonedas] = useState({})
//una ves pasada la validacion se va llenar el objeto de resultado con los valores seleccionados y va mostrar la informacion del dia de sus valores
const [resultado , setResultado] = useState({})
const [cargando , setCargando] = useState(false)

//iteramos con la api mediante un useEffect consultando la informacion de la moneda respecto a sus valores diarios
useEffect(()=>{
if(Object.keys(monedas).length > 0){
  setCargando(true)
  setResultado({})
  const cotizarCripto =  async()=>{
    const {moneda , criptomoneda} = monedas
   const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

   const respuesta = await fetch(url)
   const resultado = await respuesta.json()
   setResultado(resultado.DISPLAY[criptomoneda][moneda])
   setCargando(false)
  }

  cotizarCripto()
}
},[monedas])

  return (
    
      <Contenedor>
        <Imagen src={ImagenCripto} alt="imagenes criptos monedas" />
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario
          setMonedas={setMonedas}
          />
          {cargando && <Spinner />}
      {resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
      </Contenedor>
    
  );
}

export default App;
