
import styled from '@emotion/styled'

//estilos mediante styles components 
const Texto = styled.div`
    background-color: #B7322C;
    color: #FFF;
    padding: 15px;
    font-size: 20px;
    text-transform: uppercase;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    text-align: center;
    border-radius: 20px;
`

//via props children enviamos informacion
const Error = ({children}) => {
  return (
    <Texto>{children}</Texto>
  )
}

export default Error