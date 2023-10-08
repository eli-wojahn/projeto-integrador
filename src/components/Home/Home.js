import React from 'react';
import Swal from 'sweetalert2';
import { SidebarContainer, Button, Image, ImageIcons, StyledButton, FloatingButton, BackgroundImage, 
    PriorityContainer, ButtonsContainer, IconButton, ButtonRow, ImagePins } from './HomeStyle';
import { useNavigate } from 'react-router-dom';

import polaroidImage from './polaroid.png';
import share1 from './share.png'
import share2 from './share2.png'
import exit from './exitIcon.png'
import avatar from './avatar.png'
import pin_red from './pin_red.png'
import pin_blue from './pin_blue.png'
import pin_green from './pin_green.png'
import pin_yellow from './pin_yellow.png'
import pin_purple from './pin_purple.png'



const HomeScreen = () => {
    const imageSrc = polaroidImage;
    const navigate = useNavigate();

    const handleExitClick = () => {
        navigate('/');
    };

    const openModal = () => {
        Swal.fire({
            title: 'Adicione seu desejo',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Image URL">' +
                '<input id="swal-input3" class="swal2-input" placeholder="URL">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    imageURL: document.getElementById('swal-input2').value,
                    url: document.getElementById('swal-input3').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // You can access the entered values here using result.value
                console.log('Result:', result.value);
                // TODO: Add logic to save the entered values
            }
        });
    };

    return (
        <SidebarContainer>
            <Image src={imageSrc} alt="Imagem" />
            <Button>Organizar</Button>
            <PriorityContainer>
                <ImagePins src={pin_red} alt="Imagem" />
                <StyledButton>Prioridade 1</StyledButton>
            </PriorityContainer>
            <PriorityContainer>
                <ImagePins src={pin_blue} alt="Imagem" />
                <StyledButton>Prioridade 2</StyledButton>
            </PriorityContainer>
            <PriorityContainer>
                <ImagePins src={pin_green} alt="Imagem" />
                <StyledButton>Prioridade 3</StyledButton>
            </PriorityContainer>
            <PriorityContainer>
                <ImagePins src={pin_purple} alt="Imagem" />
                <StyledButton>Prioridade 4</StyledButton>
            </PriorityContainer>
            <PriorityContainer>
                <ImagePins src={pin_yellow} alt="Imagem" />
                <StyledButton>Prioridade 5</StyledButton>
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
                        <ImageIcons src={exit} onClick={handleExitClick} alt="exit" style={{ width: "50px" }} />
                    </IconButton>
                </ButtonRow>
            </ButtonsContainer>
            <FloatingButton onClick={openModal}>+</FloatingButton>
            <BackgroundImage />
        </SidebarContainer>
    );
};


export default HomeScreen;
