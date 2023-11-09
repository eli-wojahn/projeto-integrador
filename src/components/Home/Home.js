import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';

import {
  AppContainer, MainContainer, CardsContainer, FloatingButton, BackgroundImage, PolaroidBg
} from './HomeStyle';

import { Card, CardContent, CardActionArea, Typography } from '@mui/material';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [desejos, setDesejos] = useState([]);
  const [productImages, setProductImages] = useState({});

  const fetchDesejos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/desejos');
      const desejoData = response.data;

      const productImagesData = {};
      await Promise.all(
        desejoData.map(async (desejo) => {
          if (desejo.url) {
            try {
              const imageResponse = await axios.get(desejo.url, {
                responseType: 'arraybuffer',
              });
              const imageBlob = new Blob([imageResponse.data], {
                type: imageResponse.headers['content-type'],
              });
              const imageUrl = URL.createObjectURL(imageBlob);
              productImagesData[desejo.id] = imageUrl;
            } catch (error) {
              console.error('Error fetching product image:', error);
            }
          }
        })
      );

      setProductImages(productImagesData);
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
      willClose: (modal) => {
        if (modal.isDenied) {
          deleteDesejo(desejo.id);
        }
      },
    });
  };

  const DesejoCard = ({ desejo, editDesejo, productImages }) => {
    const openEditModal = async () => {
      editDesejo(desejo);
    };

    return (
      <Card onClick={openEditModal} style={{marginLeft: "35px"}}> 
        <CardActionArea>
          {desejo.url && productImages[desejo.id] ? (
            <img src={productImages[desejo.id]} alt={desejo.nome} />
          ) : (
            <CardContent>
              <PolaroidBg></PolaroidBg>
              <Typography variant="h6" style={{fontWeight: "bold"}}>{desejo.nome}</Typography>
              <Typography variant="body2">{desejo.descricao}</Typography>
            </CardContent>
          )}
        </CardActionArea>
      </Card>
    );
  };

  const deleteDesejo = async (desejoId) => {
    console.log('Tentando excluir desejo com ID:', desejoId);

    try {
      const response = await axios.delete(`http://localhost:3001/desejos/${desejoId}`);
      console.log('Resposta da exclusão:', response);

      if (response.status === 200) {
        // A exclusão foi bem-sucedida, você pode executar ações adicionais aqui
        console.log('Desejo excluído com sucesso:', desejoId);

        // Por exemplo, atualizar o estado local para refletir a exclusão
        const updatedDesejos = desejos.filter((d) => d.id !== desejoId);
        setDesejos(updatedDesejos);
      } else {
        // A exclusão não foi bem-sucedida, trate-a aqui
        console.error('Erro ao excluir o desejo:', response);

        // Você pode exibir uma mensagem de erro para o usuário, se necessário
      }
    } catch (error) {
      console.error('Erro ao excluir o desejo:', error);
    } finally {
      Swal.close();
    }
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
