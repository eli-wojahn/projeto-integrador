import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import polaroidImage from '../Login/polaroid.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LoginContainer,
  LoginHeader,
  FormControl,
  FormControl2,
  EmailInput,
  PasswordInput,
  Image,
  ImageContainer,
  RightContainer,
  Container,
  Column,
  Row,
  GenericInput,
  GenericButton
} from './CreateLoginStyle.js';

const CreateAccountScreen = () => {
  const navigate = useNavigate();

  const imageSrc = polaroidImage;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [cpf, setCPF] = useState('');

  const formatCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D/g, '');

    if (cleanedCPF.length > 11) {
      return cleanedCPF.slice(0, 11);
    }

    // Aplica a formatação XXX.XXX.XXX-XX
    return cleanedCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
  };

  // Função para validar a senha
  const validatePassword = (password) => {
    const messages = [];

    if (password.length < 8) {
      messages.push('A senha deve ter no mínimo, 8 caracteres.');
    }

    const maiusculas = /[A-Z]/;
    const minusculas = /[a-z]/;
    const numeros = /[0-9]/;
    const caracteres = /[!@#$%^&*(),.?":{}|<>]/;

    if (!maiusculas.test(password) || !minusculas.test(password) || !numeros.test(password) || !caracteres.test(password)) {
      messages.push('A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.');
    }

    return messages;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleDataNascChange = (event) => {
    setDataNasc(event.target.value);
  };

  const handleCPFChange = (event) => {
    const cleanedCPF = event.target.value.replace(/\D/g, '');
    const truncatedCPF = cleanedCPF.slice(0, 11);
    const formattedCPF = formatCPF(truncatedCPF);
    setCPF(formattedCPF);
  };

  const handleCreateAccountClick = async () => {
    if (!email || !password || !repeatPassword || !dataNasc || !fullName || !cpf) {
      Swal.fire('Erro', 'Preencha todos os campos.', 'error');
      return;
    }


    // verificação de e-mail cadastrado
    try {
      const response = await axios.get(`http://localhost:3001/usuarios/${email}`);
      console.log("Dados de email:", response.data)
      if (response.data.length > 0) {
        Swal.fire('Alerta', 'E-mail já cadastrado. Por favor, informe outro e-mail.', 'warning');
        return;
      }
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error);
      Swal.fire('Erro', 'Houve um erro ao criar a conta. Por favor, tente novamente.', 'error');
      return;
    }

    // verificação de senha
    const passwordValidation = validatePassword(password);
    if (passwordValidation.length > 0) {
      Swal.fire('Alerta', passwordValidation.join('\n'), 'warning');
      return;
    }

    const userData = {
      nome: fullName,
      cpf,
      dataNasc,
      email,
      senha: password
    };

    try {
      const response = await axios.post('http://localhost:3001/usuarios', userData);
      console.log('Usuário cadastrado:', response.data);
      Swal.fire('Sucesso', 'Conta criada com sucesso', 'success');
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      console.log(error);
      Swal.fire('Erro', 'Houve um erro ao criar a conta. Por favor, tente novamente.', 'error');
    }

    // setEmail('');
    // setPassword('');
    // setRepeatPassword('');
    // setFullName('');
    // setCPF('');
    // setDataNasc('');

    // Swal.fire('Sucesso', 'Conta criada com sucesso', 'success');
    // navigate('/');
  };

  return (
    <Container>
      <Row>
        <Column size={6}>
          <LoginContainer>
            <LoginHeader>
              Crie sua conta e comece agora mesmo
            </LoginHeader>
            <FormControl>
              <GenericInput
                type="text"
                placeholder="Nome completo"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </FormControl>
            <FormControl>
              <GenericInput
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={handleCPFChange}
                maxLength={14}
              />
            </FormControl>
            <FormControl>
              <GenericInput
                type="date"
                placeholder="Data de Nascimento"
                value={dataNasc}
                onChange={handleDataNascChange}
                maxLength={10}
              />
            </FormControl>
            <FormControl>
              <EmailInput
                type="email"
                placeholder="Endereço de e-mail"
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
              <PasswordInput
                type="password"
                placeholder="Repetir senha"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
              />
            </FormControl>
            <FormControl2>
              <GenericButton onClick={handleCreateAccountClick}>Criar conta</GenericButton>
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

export default CreateAccountScreen;