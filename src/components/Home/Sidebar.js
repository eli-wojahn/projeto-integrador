import React from 'react';
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

const Sidebar = ({ handleExitClick, openModal }) => {
  return (
    <SidebarContainer>
      <Image src={images.polaroidImage} alt="Imagem" />
      <Button>Organizar</Button>
      <PriorityContainer>
        <ImagePins src={images.pin_red} alt="Imagem" />
        <PriorityField initialValue="Prioridade 1" />
      </PriorityContainer>
      <PriorityContainer>
        <ImagePins src={images.pin_blue} alt="Imagem" />
        <PriorityField initialValue="Prioridade 2" />
      </PriorityContainer>
      <PriorityContainer>
        <ImagePins src={images.pin_green} alt="Imagem" />
        <PriorityField initialValue="Prioridade 3" />
      </PriorityContainer>
      <PriorityContainer>
        <ImagePins src={images.pin_purple} alt="Imagem" />
        <PriorityField initialValue="Prioridade 4" />
      </PriorityContainer>
      <PriorityContainer>
        <ImagePins src={images.pin_yellow} alt="Imagem" />
        <PriorityField initialValue="Prioridade 5" />
      </PriorityContainer>
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
