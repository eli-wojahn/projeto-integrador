import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as images from './Images';
import 'sweetalert2/dist/sweetalert2.min.css';

import {
  SidebarContainer,
  Image,
  PriorityContainer,
  ImagePins,
  ButtonsContainer,
  IconButton,
  ButtonRow,
  ImageIcons
} from './HomeStyle';

import UsuarioContext from '../Contexts/Usuario.js';

const PriorityField = ({ initialValue }) => {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        padding: '5px',
        fontSize: '16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {initialValue}
    </div>
  );
};

const SharedSidebar = ({ handleExitClick }) => {
  const [prioridades, setPrioridades] = useState([]);

  const { userNome, userId } = useContext(UsuarioContext)

  const fetchPrioridades = async () => {
    try {
      const response = await axios.get('http://localhost:3001/prioridades');
      const prioridadeData = response.data;

      setPrioridades(prioridadeData);
    } catch (error) {
      console.error('Error fetching prioridade data:', error);
    }
  };

  const createPrioridades = async () => {
    try {
      const response = await axios.get('http://localhost:3001/prioridades');
      const prioridadeData = response.data;

      if (prioridadeData.length === 0) {
        const usuario_id = userId;

        for (let i = 1; i <= 5; i++) {
          const novoNome = `Prioridade ${i}`;
          const cor = corPorId[i];

          await axios.post('http://localhost:3001/prioridades', {
            nome: novoNome,
            cor: cor,
            usuario_id,
          });
        }

        const responseAtualizado = await axios.get('http://localhost:3001/prioridades');
        const prioridadeDataAtualizado = responseAtualizado.data;
        setPrioridades(prioridadeDataAtualizado);
      }
    } catch (error) {
      console.error('Error fetching or creating prioridade data:', error);
    }
  };

  useEffect(() => {
    fetchPrioridades();
    createPrioridades();
    // eslint-disable-next-line 
  }, []);

  const corPorId = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'purple',
    5: 'yellow',
  };

  return (
    <SidebarContainer>
      <Image src={images.polaroidImage} alt="Imagem" />
      <h5 style={{marginTop: "25px"}}>Bem-vindo à lista de desejos de:</h5>
      <p>{userNome}</p>
      {prioridades.map((prioridade, index) => (
        <PriorityContainer key={index}>
          <ImagePins src={images[`pin_${corPorId[prioridade.id]}`]} alt="Imagem" />
          <PriorityField initialValue={`${prioridade.nome}`} />
        </PriorityContainer>
      ))}

      <ButtonsContainer style={{ marginTop: 'auto' }}>
        <ButtonRow>
        </ButtonRow>
        <ButtonRow>
          <IconButton>
            <ImageIcons src={images.avatar} alt="avatar" />
          </IconButton>
          <IconButton>
            <ImageIcons
              src={images.exit}
              onClick={handleExitClick}
              alt="exit"
              style={{ width: '50px' }}
            />
          </IconButton>
        </ButtonRow>
      </ButtonsContainer>
    </SidebarContainer>
  );
};

export default SharedSidebar;
