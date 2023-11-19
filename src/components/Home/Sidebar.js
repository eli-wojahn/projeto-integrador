import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as images from './Images';

import {
  SidebarContainer,
  Image,
  Button,
  PriorityContainer,
  ImagePins,
  ButtonsContainer,
  IconButton,
  ButtonRow,
  ImageIcons
} from './HomeStyle';

const PriorityField = ({ id, initialValue }) => {
  const [text, setText] = useState(initialValue);

  const updatePriority = async () => {
    try {
      await axios.put(`http://localhost:3001/prioridades/${id}`, { nome: text });
    } catch (error) {
      console.error('Erro ao atualizar a prioridade:', error);
    }
  };

  useEffect(() => {
    if (initialValue !== text) {
      updatePriority();
    }
  }, [initialValue, text, id]);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => {
        if (e.target.value.length <= 14) {
          setText(e.target.value);
        }
      }}
      onBlur={updatePriority}
      maxLength={14}
      title="Customize aqui o nome da prioridade"
      style={{
        backgroundColor: '#f0f0f0',
        border: 'none',
        outline: 'none',
        width: '100%',
        fontSize: '16px',
        padding: '5px',
      }}
    />
  );
};

const Sidebar = ({ handleExitClick }) => {
  const [prioridades, setPrioridades] = useState([]);

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
        for (let i = 1; i <= 5; i++) {
          const novoNome = `Prioridade ${i}`;
          const cor = corPorId[i];

          await axios.post('http://localhost:3001/prioridades', {
            nome: novoNome,
            cor: cor,
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
      <Button>Organizar</Button>

      {prioridades.map((prioridade, index) => (
        <PriorityContainer key={index}>
          <ImagePins src={images[`pin_${corPorId[prioridade.id]}`]} alt="Imagem" />
          <PriorityField id={prioridade.id} initialValue={`${prioridade.nome}`} />
        </PriorityContainer>
      ))}

      <ButtonsContainer style={{ marginTop: 'auto' }}>
        <ButtonRow>
          <IconButton>
            <ImageIcons src={images.share1} alt="share" />
          </IconButton>
          <IconButton>
            <ImageIcons src={images.share2} alt="share" />
          </IconButton>
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

export default Sidebar;
