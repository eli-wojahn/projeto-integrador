import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import polaroidImage from './polaroid.png';
import {
  LoginContainer, LoginHeader, Subtitle, FormControl, FormControl2, EmailInput, PasswordInput, RememberMeLabel,
  ForgotPasswordLink, LoginButton, CreateAccountButton, Image, ImageContainer, RightContainer, Container, Column, Row
} from './LoginStyle.js';
import UsuarioContext from '../Contexts/Usuario.js';
import { setCookie } from 'nookies'; 

const LoginScreen = () => {
  const imageSrc = polaroidImage;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mudaId, mudaNome } = useContext(UsuarioContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function verificaLogin() {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

    if (!email.match(emailPattern)) {
      console.error('Invalid email');
      Swal.fire('Erro', 'Digite um e-mail válido', 'error');
      return;
    }

    try {
      const userData = {
        email,
        senha: password
      };

      const response = await axios.post('http://localhost:3001/login', userData);

      if (response.status === 200 && response.data.msg === 'Usuário logado') {
        const { id, nome } = response.data;

        mudaId(id);
        mudaNome(nome);

        setCookie(null, 'usuario_logado', JSON.stringify({ id, nome }), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });

        Swal.fire('Sucesso', 'Login realizado com sucesso', 'success');
        navigate('/home');
      } else {
        Swal.fire('Erro', 'Houve um erro ao realizar o login. Por favor, tente novamente.', 'error');
      }
    } catch (error) {
      console.error('Erro ao realizar o login:', error);

      if (error.response && error.response.status === 401) {
        Swal.fire('Erro', 'Usuário não cadastrado.', 'error');
      } else {
        Swal.fire('Erro', 'Houve um erro ao realizar o login. Por favor, tente novamente.', 'error');
      }
    }
  }

  return (
    <Container>
      <Row>
        <Column size={6}>
          <LoginContainer>
            <LoginHeader>
              Seus presentes de um jeito fácil!
            </LoginHeader>
            <Subtitle>
              Bem-vindo ao iWanna!, faça seu login para personalizar a sua experiência.
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

              <LoginButton onClick={verificaLogin}>Login</LoginButton>

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