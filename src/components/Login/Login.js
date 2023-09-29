import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import polaroidImage from './polaroid.png';
import {
  LoginContainer, LoginHeader, Subtitle, FormControl, FormControl2, EmailInput, PasswordInput, RememberMeLabel, ForgotPasswordLink, LoginButton, CreateAccountButton, Image, ImageContainer, RightContainer, Container, Column, Row
} from './LoginStyle.js';

const LoginScreen = () => {
  const imageSrc = polaroidImage;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = () => {
    validateUser();
  };

  const validateUser = () => {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/;

    if (!email.match(emailPattern)) {
      console.error('Invalid email');
      Swal.fire('Erro', 'Digite um e-mail válido', 'error');
      return;
    }

    if (!password.match(passwordPattern)) {
      console.error('Invalid password');
      Swal.fire('Erro', 'Sua senha deve conter no mínimo 5 caracteres incluindo UMA letra maiúscula, UMA letra minúscula e UM número. Não pode ter caracteres especiais', 'error');
      return;
    }

    setEmail('');
    setPassword('');
    Swal.fire('Sucesso', 'Login realizado com sucesso', 'success');
  };

  return (
    <Container>
      <Row>
        <Column size={6}>
          <LoginContainer>
            <LoginHeader>
              Seus presentes de um jeito fácil lorem ipsum lorem ipsum
            </LoginHeader>
            <Subtitle>
              Bem-vindo ao Iwanna, faça seu login para desfrutar de lorem ipsum lorem ipsum
            </Subtitle>
            <FormControl>
              <EmailInput
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl>
              <PasswordInput
                type="password"
                placeholder="Senha"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <FormControl>
              <RememberMeLabel>
                <input type="checkbox" />
                Manter conectado
              </RememberMeLabel>
              <ForgotPasswordLink>Esqueceu a senha?</ForgotPasswordLink>
            </FormControl>
            <FormControl2>
              <Link to="/home">
                <LoginButton onClick={handleLoginClick}>Login</LoginButton>
              </Link>
              <Link to="/create-account">
                <CreateAccountButton>Criar conta</CreateAccountButton>
              </Link>
            </FormControl2>
          </LoginContainer>
        </Column>
        <Column size={6}>
          <RightContainer>
            <ImageContainer>
              <Image src={imageSrc} alt="Imagem" />
            </ImageContainer>
          </RightContainer>
        </Column>
      </Row>
    </Container>
  );
};

export default LoginScreen;
