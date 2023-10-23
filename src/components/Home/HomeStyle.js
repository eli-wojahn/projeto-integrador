import styled from 'styled-components';
import { BsFillPinAngleFill } from 'react-icons/bs';
import backgroundImage from './home1.png'

export const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Image = styled.img`
  width: 80%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5%;
  margin-top: 20px;
`;

export const ImagePins = styled.img`
  width: 20%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5%;

`;

export const ImageIcons = styled.img`
  width: 140%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5%;
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: #BB6CB9;
  color: white;
  padding: 14px 34px; 
  border-radius: 5px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); 
  margin-top: 35px;
  margin-bottom: 20px;
`;

export const InvisibleButton = styled.button`
background-color: white;
color: black;
padding: 14px 34px; 
border-radius: 5px;
margin-right: 10px;
border: none;
cursor: pointer;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); 
margin-top: 35px;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 100px;
  height: 100px;
  background-color: #BB6CB9;
  border: 4px solid white;
  border-radius: 50%;
  color: white;
  font-size: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 1; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const PriorityContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px; 
    font-size: 24px; 
    margin-top: 20px; 
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ButtonRow = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;

export const IconButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px; /* Ajuste o tamanho conforme necessário */
    height: 50px; /* Ajuste o tamanho conforme necessário */
    background-color: #f0f0f0; /* Adicione uma cor de fundo se desejar */
    border-radius: 50%; /* Para um ícone circular */
    margin: 12px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0e0e0; /* Altere a cor do fundo no hover conforme desejado */
    }
`;

export const StyledButton = styled.div`
  font-size: 18px;
  border: 1px  #ccc;
  border-radius: 8px;
  padding: 0.2em;
  min-width: 100px; /* Defina um tamanho mínimo para evitar que o conteúdo desapareça */
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const PinIcon = styled(BsFillPinAngleFill)`
    color: ${({ color }) => color || '#000'}; /* Pega a cor do ícone ou usa preto (#000) se não houver cor especificada */
    font-size: 24px;
    vertical-align: middle;
`;


