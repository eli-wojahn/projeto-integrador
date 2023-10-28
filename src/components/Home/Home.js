import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import polaroidImage from './polaroid.png';
import share1 from './share.png';
import share2 from './share2.png';
import exit from './exitIcon.png';
import avatar from './avatar.png';
import pin_red from './pin_red.png';
import pin_blue from './pin_blue.png';
import pin_green from './pin_green.png';
import pin_yellow from './pin_yellow.png';
import pin_purple from './pin_purple.png';

import {
  SidebarContainer,
  Button,
  Image,
  ImageIcons,
  FloatingButton,
  BackgroundImage,
  PriorityContainer,
  ButtonsContainer,
  IconButton,
  ButtonRow,
  ImagePins,
  AppContainer,
  MainContainer,
  Card,
  Title,
  Description,
  CardContainer,
  CardsContainer
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
  }, [text, initialValue, id]);

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

const imageSrc = polaroidImage;

const HomeScreen = () => {
  const navigate = useNavigate();
  const [desejos, setDesejos] = useState([]); // Lista de desejos

  useEffect(() => {
    // Fazer uma solicitação ao servidor para obter a lista de desejos
    axios.get('http://localhost:3001/desejos')
      .then((response) => {
        setDesejos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter a lista de desejos:', error);
      });
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
        const usuario_id = 1; // Defina o ID do usuário desejado
        const prioridade_id = 1; // Defina o ID da prioridade desejada

        try {
          // Enviar os dados do desejo para o servidor
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
            // Adicionar o desejo à lista de desejos
            setDesejos([...desejos, response.data]);
          }
        } catch (error) {
          console.error('Erro ao criar o desejo:', error);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Atualize a interface do usuário ou execute outras ações, se necessário
      }
    });
  };

  const DesejoCard = ({ desejo }) => {
    return (
      <CardContainer>
        <Card>
          <Title>{desejo.nome}</Title>
          <Description>{desejo.descricao}</Description>
          {/* Adicione mais informações do desejo, como status, URL, etc., conforme necessário */}
        </Card>
      </CardContainer>
    );
  };


  return (
    <AppContainer>
      <SidebarContainer>
        <Image src={imageSrc} alt="Imagem" />
        <Button>Organizar</Button>
        <PriorityContainer>
          <ImagePins src={pin_red} alt="Imagem" />
          <PriorityField initialValue="Prioridade 1" />
        </PriorityContainer>
        <PriorityContainer>
          <ImagePins src={pin_blue} alt="Imagem" />
          <PriorityField initialValue="Prioridade 2" />
        </PriorityContainer>
        <PriorityContainer>
          <ImagePins src={pin_green} alt="Imagem" />
          <PriorityField initialValue="Prioridade 3" />
        </PriorityContainer>
        <PriorityContainer>
          <ImagePins src={pin_purple} alt="Imagem" />
          <PriorityField initialValue="Prioridade 4" />
        </PriorityContainer>
        <PriorityContainer>
          <ImagePins src={pin_yellow} alt="Imagem" />
          <PriorityField initialValue="Prioridade 5" />
        </PriorityContainer>
        <ButtonsContainer style={{ marginTop: 'auto' }}>
          <ButtonRow>
            <IconButton>
              <ImageIcons src={share1} alt="share" />
            </IconButton>
            <IconButton>
              <ImageIcons src={share2} alt="share" />
            </IconButton>
          </ButtonRow>
          <ButtonRow>
            <IconButton>
              <ImageIcons src={avatar} alt="avatar" />
            </IconButton>
            <IconButton>
              <ImageIcons
                src={exit}
                onClick={handleExitClick}
                alt="exit"
                style={{ width: '50px' }}
              />
            </IconButton>
          </ButtonRow>
        </ButtonsContainer>
        <FloatingButton onClick={openModal}>+</FloatingButton>
        <BackgroundImage />
      </SidebarContainer>
      <MainContainer>
        <CardsContainer>
          {desejos.map((desejo) => (
            <DesejoCard key={desejo.id} desejo={desejo} />
          ))}
        </CardsContainer>
      </MainContainer>
    </AppContainer>
  );
};

export default HomeScreen;
