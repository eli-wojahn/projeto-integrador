import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SharedSidebar from './SharedSidebar';
import reservedImage from './homeImages/reservado3.png';
import UsuarioContext from '../Contexts/Usuario.js';

import {
  AppContainer, MainContainer, CardsContainer, BackgroundImage, PolaroidBg, FadeInImage
} from './HomeStyle';

import { Card, CardActionArea, CardContent, Typography, } from '@mui/material';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [desejos, setDesejos] = useState([]);
  const { userId } = useContext(UsuarioContext);
  
  const fetchDesejos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/desejos/${userId}`);
      const desejoData = response.data;

      setDesejos(desejoData);
    } catch (error) {
      console.error('Error fetching desejo data:', error);
    }
  };

  useEffect(() => {
    fetchDesejos(); 
  }, [userId]);

  const handleExitClick = () => {
    navigate('/');
  };

  const ViewDesejoModal = ({ desejo }) => {
    Swal.fire({
      title: 'Visualizar Desejo',
      html: `
        <p><strong>Nome:</strong> ${desejo.nome}</p>
        <p><strong>Descrição:</strong> ${desejo.descricao}</p>
        <p><strong>Status:</strong> ${desejo.status}</p>
        <p><strong>URL:</strong> <a href="${desejo.url}" target="_blank" rel="noopener noreferrer">${desejo.url}</a></p>
        <img src="${desejo.imagem}" alt="Imagem do Desejo" style="max-width: 100%; max-height: 300px;"></p>
      `,
      showCloseButton: true,
      closeButtonHtml: 'X', 
      focusConfirm: false,
    });
  };

  const DesejoCard = ({ desejo }) => {
    const openViewModal = () => {
      ViewDesejoModal({ desejo });
    };

    return (
      <Card onClick={openViewModal} style={{ marginLeft: '35px', position: 'relative', marginBottom: '25px' }}>
        <CardActionArea style={{ position: 'relative' }}>
          <CardContent style={{ position: 'relative', zIndex: 1 }}>
            <PolaroidBg>
              {desejo.imagem && (
                <FadeInImage
                  src={`${desejo.imagem}`}
                  alt="Desejo Image"
                  className="fade-in-image"
                />
              )}
            </PolaroidBg>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              {desejo.nome}
            </Typography>
            <Typography variant="body2">{desejo.descricao}</Typography>
          </CardContent>
          {desejo.status === 'Reservado' && (
            <img
              src={reservedImage}
              alt="Reservado"
              style={{
                position: 'absolute',
                top: -5,
                left: 18,
                width: '95%',
                height: '95%',
                objectFit: 'cover',
                zIndex: 2,
              }}
            />
          )}
        </CardActionArea>
      </Card>
    );
  };

  return (
    <AppContainer>
      <SharedSidebar handleExitClick={handleExitClick} />
      <MainContainer>
        <CardsContainer>
          {desejos.map((desejo) => (
            <DesejoCard key={desejo.id} desejo={desejo} />
          ))}
        </CardsContainer>
      </MainContainer>
      <BackgroundImage />
    </AppContainer>
  );
};

export default HomeScreen;  