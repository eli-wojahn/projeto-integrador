import React from 'react';
import Swal from 'sweetalert2';
import { SidebarContainer, Button, Image, FloatingButton, BackgroundImage, PriorityContainer, ButtonsContainer, IconButton, ButtonRow, PinIcon } from './HomeStyle';
import polaroidImage from './polaroid.png';
import { useNavigate } from 'react-router-dom';
import { BsFillShareFill } from 'react-icons/bs';
import { FaShare, FaUserCircle } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';



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
                <PinIcon color="#e2172f" />  Prioridade 1
            </PriorityContainer>
            <PriorityContainer>
                <PinIcon color="#0e14b5" />  Prioridade 2
            </PriorityContainer>
            <PriorityContainer>
                <PinIcon color="#ccc91c" />  Prioridade 3
            </PriorityContainer>
            <PriorityContainer>
                <PinIcon color="#a737c2" />  Prioridade 4
            </PriorityContainer>
            <PriorityContainer>
                <PinIcon color="#23944a" />  Prioridade 5
            </PriorityContainer>
            <ButtonsContainer style={{ marginTop: 'auto' }}>
                <ButtonRow>
                    <IconButton><FaShare style={{ fontSize: '35px', color: '#971c9b' }} /></IconButton>
                    <IconButton><BsFillShareFill style={{ fontSize: '35px', color: '#15623f' }} /></IconButton>
                </ButtonRow>
                <ButtonRow>
                    <IconButton><FaUserCircle style={{ fontSize: '35px', color: '#d25518' }} /></IconButton>
                    <IconButton onClick={handleExitClick}><IoIosExit style={{ fontSize: '42px', color: '#173d79' }} /></IconButton>
                </ButtonRow>
            </ButtonsContainer>
            <FloatingButton onClick={openModal}>+</FloatingButton>
            <BackgroundImage />
        </SidebarContainer>
    );
};


export default HomeScreen;
