import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import reservedImage from './homeImages/reservado3.png';
import Draggable from 'react-draggable';


import {
  AppContainer, MainContainer, CardsContainer, BackgroundImage, PolaroidBg, FadeInImage
} from './HomeStyle';

import { Card, CardActionArea, CardContent, Fab, Typography, } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [desejos, setDesejos] = useState([]);

  const apikey = '3a55eda8d68143a4a5116c1051638b0d';
  const shortenUrl = async (url) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/shorten-url',
        {
          destination: url,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': apikey,
          },
        }
      );

      const shortUrl = response.data.shortUrl;
      return shortUrl;
    } catch (error) {
      console.error('Erro ao encurtar URL:', error);
      throw error;
    }
  };

  
  const fetchDesejos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/desejos');
      const desejoData = response.data;

      setDesejos(desejoData);
    } catch (error) {
      console.error('Error fetching desejo data:', error);
    }
  };

  useEffect(() => {
    fetchDesejos();
  }, []);

  const handleExitClick = () => {
    navigate('/');
  };

  const openModal = () => {
    Swal.fire({
      title: 'Adicione seu desejo',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nome">
        <input id="swal-input2" class="swal2-input" placeholder="Descrição">
        <input id="swal-input4" class="swal2-input" placeholder="URL">
        <input id="swal-input5" class="swal2-input" placeholder="Imagem">
        <div class="swal2-radio">
          <input type="radio" id="radio-disponivel" name="status" value="Disponível">
          <label for="radio-disponivel">Disponível</label>
          <input type="radio" id="radio-reservado" name="status" value="Reservado">
          <label for="radio-reservado">Reservado</label>
        </div>
        <div class="swal2-radio">
          <input type="radio" id="radio-1" name="prioridade" value="1">
          <label for="radio-1">1</label>
          <input type="radio" id="radio-2" name="prioridade" value="2">
          <label for="radio-2">2</label>
          <input type="radio" id="radio-3" name="prioridade" value="3">
          <label for="radio-3">3</label>
          <input type="radio" id="radio-4" name="prioridade" value="4">
          <label for="radio-4">4</label>
          <input type="radio" id="radio-5" name="prioridade" value="5">
          <label for="radio-5">5</label>
        </div>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        const url = document.getElementById('swal-input4').value;

        try {
          const shortUrl = await shortenUrl(url);
          const name = document.getElementById('swal-input1').value;
          const description = document.getElementById('swal-input2').value;
          const status = document.querySelector('input[name="status"]:checked');
          const imagem = document.getElementById('swal-input5').value;

          if (!name || !description || !status || !url || !imagem) {
            Swal.fire('Preencha todos os campos', '', 'warning');
            return;
          }

          const statusValue = status.value;
          const usuario_id = 1;
          const prioridade_id = 1;

          const response = await axios.post('http://localhost:3001/desejos', {
            nome: name,
            descricao: description,
            status: statusValue,
            url: shortUrl,
            imagem: imagem,
            usuario_id: usuario_id,
            prioridade_id: prioridade_id,
          });

          console.log(response.status)
          // console.log('Headers da resposta:', response.headers);
          // console.log('Dados da resposta:', response.data);

          if (response.status === 200 || response.status === 201) {
            console.log('Desejo criado:', response.data);
            setDesejos([...desejos, response.data]);
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Só o proprietário do desejo pode cadastrar',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } catch (error) {
          console.error('Erro ao criar o desejo:', error);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  };

  const EditDesejoModal = ({ desejo, fetchDesejos }) => {
    const statusDisponivelChecked = desejo.status === 'Disponível' ? 'checked' : '';
    const statusReservadoChecked = desejo.status === 'Reservado' ? 'checked' : '';

    Swal.fire({
      title: 'Editar Desejo',
      html: `
        <input id="swal-edit-input1" class="swal2-input" placeholder="Nome" value="${desejo.nome}">
        <input id="swal-edit-input2" class="swal2-input" placeholder="Descrição" value="${desejo.descricao}">
        <input id="swal-edit-input4" class="swal2-input" placeholder="URL" value="${desejo.url}">
        <input id="swal-input5" class="swal2-input" placeholder="Imagem" value="${desejo.imagem}">
        <div class="swal2-radio">
          <input type="radio" id="radio-disponivel" name="status" value="Disponível" ${statusDisponivelChecked}>
          <label for="radio-disponivel">Disponível</label>
          <input type="radio" id="radio-reservado" name="status" value="Reservado" ${statusReservadoChecked}>
          <label for="radio-reservado">Reservado</label>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      showDenyButton: true,
      denyButtonText: 'Excluir',
      preConfirm: async () => {
        const name = document.getElementById('swal-edit-input1').value;
        const description = document.getElementById('swal-edit-input2').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        const url = document.getElementById('swal-edit-input4').value;
        const imagem = document.getElementById('swal-input5').value;

        const updatedDesejo = {
          ...desejo,
          nome: name,
          descricao: description,
          status,
          url,
          imagem,
          usuario_id: 1,
          prioridade_id: 1,
        };

        try {
          const response = await axios.put(`http://localhost:3001/desejos/${desejo.id}`, updatedDesejo);
          if (response.data) {
            fetchDesejos();
          }
        } catch (error) {
          console.error('Erro ao editar o desejo:', error);
        }
      },
    }).then((result) => {
      if (result.isDenied) {
        removeDesejo(desejo.id);
      }
    });
  };

  const removeDesejo = async (desejoId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/desejos/${desejoId}`);

      if (response.status === 200) {
        fetchDesejos()

        Swal.fire('Removido!', 'O desejo foi removido com sucesso.', 'success');
      }
    } catch (error) {
      console.error('Erro ao remover desejo:', error);
      Swal.fire('Erro!', 'Ocorreu um erro ao remover o desejo.', 'error');
    }
  };

  useEffect(() => {
    fetchDesejos();
  }, [])

  const DesejoCard = ({ desejo }) => {
    const openEditModal = () => {
      EditDesejoModal({ desejo, fetchDesejos });
    };

    return (
      <Draggable>
      <Card onClick={openEditModal} style={{ marginLeft: '35px', position: 'relative', marginBottom: '25px' }}>
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
      </Draggable>
    );
  };


  return (
    <AppContainer>
      <Sidebar handleExitClick={handleExitClick} openModal={openModal} />
      <MainContainer>
        <CardsContainer>
          {desejos.map((desejo) => (
            <DesejoCard key={desejo.id} desejo={desejo} />
          ))}
        </CardsContainer>
      </MainContainer>
      <BackgroundImage />

      <Fab
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: 90,
          right: 90,
          width: 100,
          height: 100,
          backgroundColor: '#BB6CB9',
          '& .MuiSvgIcon-root': {
            fontSize: 60,
          },
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
        }}
        onClick={openModal}
      >
        <AddIcon />
      </Fab>
    </AppContainer>
  );
};



export default HomeScreen;