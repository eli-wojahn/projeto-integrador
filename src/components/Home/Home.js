import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';

import {
  AppContainer, MainContainer, CardsContainer, FloatingButton, BackgroundImage, PolaroidBg
} from './HomeStyle';

import { Card, CardActionArea, CardActions, CardContent, Typography, Button } from '@mui/material';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [desejos, setDesejos] = useState([]);
  const [productImages, setProductImages] = useState({});

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
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nome">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Descrição">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Status">' +
        '<input id="swal-input4" class="swal2-input" placeholder="URL">',
      focusConfirm: false,
      preConfirm: async () => {
        const name = document.getElementById('swal-input1').value;
        const description = document.getElementById('swal-input2').value;
        const status = document.getElementById('swal-input3').value;
        const url = document.getElementById('swal-input4').value;
        const usuario_id = 1;
        const prioridade_id = 1;

        try {
          const response = await axios.post('http://localhost:3001/desejos', {
            nome: name,
            descricao: description,
            status: status,
            url: url,
            usuario_id: usuario_id,
            prioridade_id: prioridade_id,
          });

          if (response.data) {
            console.log('Desejo criado:', response.data);
            setDesejos([...desejos, response.data]);
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

  const editDesejo = (desejo) => {
    Swal.fire({
      title: 'Editar Desejo',
      html:
        '<input id="swal-edit-input1" class="swal2-input" placeholder="Nome" value="' +
        desejo.nome +
        '">' +
        '<input id="swal-edit-input2" class="swal2-input" placeholder="Descrição" value="' +
        desejo.descricao +
        '">' +
        '<input id="swal-edit-input3" class="swal2-input" placeholder="Status" value="' +
        desejo.status +
        '">' +
        '<input id="swal-edit-input4" class="swal2-input" placeholder="URL" value="' +
        desejo.url +
        '">',
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
        const status = document.getElementById('swal-edit-input3').value;
        const url = document.getElementById('swal-edit-input4').value;

        const updatedDesejo = {
          ...desejo,
          nome: name,
          descricao: description,
          status,
          url,
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
    });
  };

  const removeDesejo = async (desejoId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/desejos/${desejoId}`);

      if (response.status === 200) {
        // Atualizar o estado local removendo o desejo excluído
       //  setDesejos((prevDesejos) => prevDesejos.filter((desejo) => desejo.id !== desejoId));
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

  const DesejoCard = ({ desejo, productImages }) => {
    const openEditModal = async () => {
      Swal.fire({
        title: 'Editar Desejo',
        html: `
          <input id="swal-edit-input1" class="swal2-input" placeholder="Nome" value="${desejo.nome}">
          <input id="swal-edit-input2" class="swal2-input" placeholder="Descrição" value="${desejo.descricao}">
          <input id="swal-edit-input3" class="swal2-input" placeholder="Status" value="${desejo.status}">
          <input id="swal-edit-input4" class="swal2-input" placeholder="URL" value="${desejo.url}">
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
          const status = document.getElementById('swal-edit-input3').value;
          const url = document.getElementById('swal-edit-input4').value;

          const updatedDesejo = {
            ...desejo,
            nome: name,
            descricao: description,
            status,
            url,
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
    
    return (
      <Card onClick={openEditModal} style={{ marginLeft: '35px' }}>
        <CardActionArea>
          {desejo.url && productImages[desejo.id] ? (
            <img src={productImages[desejo.id]} alt={desejo.nome} />
          ) : (
            <CardContent>
              <PolaroidBg></PolaroidBg>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {desejo.nome}
              </Typography>
              <Typography variant="body2">{desejo.descricao}</Typography>
            </CardContent>
          )}
        </CardActionArea>
      </Card>
    );
  };

  return (
    <AppContainer>
      <Sidebar handleExitClick={handleExitClick} openModal={openModal} />
      <MainContainer>
        <CardsContainer>
          {desejos.map((desejo) => (
            <DesejoCard key={desejo.id} desejo={desejo} editDesejo={editDesejo} productImages={productImages} />
          ))}
        </CardsContainer>
      </MainContainer>
      <BackgroundImage />
      <FloatingButton onClick={openModal}>+</FloatingButton>
    </AppContainer>
  );
};



export default HomeScreen;
