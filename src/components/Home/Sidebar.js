import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as images from './Images';

import PriorityField from './PriorityField';
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

  useEffect(() => {
    fetchPrioridades();
  }, []);

  const corPorId = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'purple',
    5: 'yellow',
  };

  const CreatePriority = async () => {
    try {
      const response = await axios.post('http://localhost:3001/prioridades', {
        nome: 'Prioridade',
      });

      const createdPriority = response.data;
      setPrioridades([...prioridades, createdPriority]);
    } catch (error) {
      console.error('Error creating priority:', error);
    }
  };

  const UpdatePriority = async (id, newName) => {
    try {
      await axios.put(`http://localhost:3001/prioridades/${id}`, {
        nome: newName,
      });

      const updatedPriorities = prioridades.map((priority) =>
        priority.id === id ? { ...priority, nome: newName } : priority
      );

      setPrioridades(updatedPriorities);
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  return (
    <SidebarContainer>
      <Image src={images.polaroidImage} alt="Imagem" />
      <Button>Organizar</Button>

      <Button onClick={CreatePriority}>Adicionar Prioridade</Button>
      {prioridades.map((prioridade, index) => (
        <PriorityContainer key={index}>
          <ImagePins src={images[`pin_${corPorId[prioridade.id]}`]} alt="Imagem" />
          <PriorityField
            initialValue={`${prioridade.nome} ${prioridade.id}`}
            onUpdate={(newName) => UpdatePriority(prioridade.id, newName)}
          />
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
