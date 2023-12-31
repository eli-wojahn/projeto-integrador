import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as images from './Images';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

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

import UsuarioContext from '../Contexts/Usuario.js';

const PriorityField = ({ id, initialValue }) => {
  const [text, setText] = useState(initialValue);
  const { userId } = useContext(UsuarioContext);

  const updatePriority = async () => {
    try {
      const usuario_id = userId;

      await axios.put(`http://localhost:3001/prioridades/${id}`, {
        nome: text,
        usuario_id,
      });
    } catch (error) {
      console.error('Erro ao atualizar a prioridade:', error);
    }
  };

  useEffect(() => {
    if (initialValue !== text) {
      updatePriority();
    }
    // eslint-disable-next-line
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

const Sidebar = ({ resetCardPosition }) => {
  const { userNome, userId, mudaId, mudaNome } = useContext(UsuarioContext);
  const [prioridades, setPrioridades] = useState([]);
  const navigate = useNavigate();

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

  const showShare1Modal = () => {
    Swal.fire({
      title: `
        <div style="text-align: center;">
          <img src="https://www.creativefabrica.com/wp-content/uploads/2021/08/23/Polaroid-frame-photo-template-design-Graphics-16251396-2-580x386.png" alt="Custom Image" style="  max-width: 100%; max-height: 100%; margin-bottom: 2px;" />
          <div>
            Compartilhe o link de sua lista
          </div>
        </div>`,
      html: '<a href="http://localhost:3000/minha-lista" target="_blank" rel="noopener noreferrer"><strong>http://localhost:3000/minha-lista</strong></a>',
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const showShare2Modal = () => {
    Swal.fire({
      title: `
        <div style="text-align: center;">
          <img src="https://www.creativefabrica.com/wp-content/uploads/2021/08/23/Polaroid-frame-photo-template-design-Graphics-16251396-2-580x386.png" alt="Custom Image" style="  max-width: 100%; max-height: 100%; margin-bottom: 2px;" />
          <div>
            Compartilhe seu link nas redes sociais
          </div>
        </div>`,
      html: `
        <div>
          <div>
            <a href="https://api.whatsapp.com/send?text=http://localhost:3000/minha-lista" target="_blank" rel="noopener noreferrer">
              <img src="https://www.unipile.com/wp-content/uploads/2022/02/xicone-logo-whatsapp-vert.png.pagespeed.ic.GpT05ETuy7.png" alt="WhatsApp" style="width: 30px; height: 30px; margin-right: 10px;" />
            </a>
            <a href="https://www.instagram.com/?url=http://localhost:3000/minha-lista" target="_blank" rel="noopener noreferrer">
              <img src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" style="width: 30px; height: 30px; margin-right: 10px;" />
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/minha-lista" target="_blank" rel="noopener noreferrer">
              <img src="https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png" alt="Facebook" style="width: 30px; height: 30px; margin-right: 10px;" />
            </a>
            <a href="mailto:?subject=Compartilhar%20Lista&body=http://localhost:3000/minha-lista" target="_blank" rel="noopener noreferrer">
              <img src="https://static.vecteezy.com/system/resources/previews/016/716/465/non_2x/gmail-icon-free-png.png" alt="Gmail" style="width: 30px; height: 30px;" />
            </a>
          </div>
        </div>
      `,
    });
  };

  const ProfileModal = () => {
    Swal.fire({
      title: `
        <div style="text-align: center;">
        <div>
        Perfil  
      </div>
          <img src="https://www.sulhosting.com/img/about-img.png" alt="Custom Image" style="  max-width: 100%; max-height: 100%; margin-bottom: 2px;" />
          <div>
          Página em construção 
        </div>
        </div>`,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Confirma saída da página?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        mudaId("");
        mudaNome("");
        destroyCookie(null, 'usuario_logado', { path: '/' });
        navigate('/');
      }
    });
  };

  return (
    <SidebarContainer>
      <Image src={images.polaroidImage} alt="Imagem" />
      <Button onClick={resetCardPosition}>Organizar</Button>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>👤 Olá, {userNome}</p>
      {prioridades.map((prioridade, index) => (
        <PriorityContainer key={index}>
          <ImagePins src={images[`pin_${corPorId[prioridade.id]}`]} alt="Imagem" style={{
            width: '40px',
          }} />
          <PriorityField id={prioridade.id} initialValue={`${prioridade.nome}`} />
        </PriorityContainer>
      ))}

      <ButtonsContainer style={{ marginTop: 'auto' }}>
        <ButtonRow>
          <IconButton onClick={showShare1Modal}>
            <ImageIcons src={images.share1} alt="share" />
          </IconButton>
          <IconButton onClick={showShare2Modal}>
            <ImageIcons src={images.share2} alt="share" />
          </IconButton>
        </ButtonRow>
        <ButtonRow>
          <IconButton onClick={ProfileModal}>
            <ImageIcons src={images.avatar} alt="avatar" />
          </IconButton>
          <IconButton>
            <ImageIcons
              src={images.exit}
              onClick={handleLogout}  // Substituindo a função de logout
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