import React from 'react';
import polaroidImage from './polaroid.png';

import {
  LoginContainer,
  LoginHeader,
  Subtitle,
  FormControl,
  FormControl2,
  EmailInput,
  PasswordInput,
  RememberMeLabel,
  ForgotPasswordLink,
  LoginButton,
  CreateAccountButton,
  Image,
  ImageContainer,
  RightContainer,
  Container,
  Column,
  Row
} from './LoginStyle.js';


const LoginScreen = () => {
  const imageSrc = polaroidImage;
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
              <EmailInput type="email" placeholder="Email Address" />
            </FormControl>
            <FormControl>
              <PasswordInput type="password" placeholder="Senha" />
            </FormControl>
            <FormControl>
              <RememberMeLabel>
                <input type="checkbox" />
                Manter conectado
              </RememberMeLabel>
              <ForgotPasswordLink>Esqueceu a senha?</ForgotPasswordLink>
            </FormControl>
            <FormControl2>
              <LoginButton>Login</LoginButton>
              <CreateAccountButton>Criar conta</CreateAccountButton>
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
