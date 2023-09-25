import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export const LoginContainer = styled.div`
  padding: 80px;
  padding-top: 200px;
  align-items: center;
  height: 100vh;
`;

export const LoginHeader = styled.h1`
  text-align: left;
  font-size: 45px;
  margin-bottom: 30px;
  color: #BB6CB9;
  width: 90%;
`;

export const Subtitle = styled.p`
  text-align: left;
  font-size: 18px;
  color: black;
  margin-bottom: 40px;
`;

export const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const FormControl2 = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 70px;
  padding: 10px;
  padding-left: 24px;
  border-radius: 8px;
  border: 2px solid #ccc;
`;

export const GenericInput= styled.input`
  width: 100%;
  height: 70px;
  padding: 10px;
  padding-left: 24px;
  border-radius: 8px;
  border: 2px solid #ccc;
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 70px;
  padding: 10px;
  padding-left: 24px;
  border-radius: 8px;
  border: 2px solid #ccc;
`;

export const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px; 
  color: black;
  padding-bottom: 20px;
`;

export const ForgotPasswordLink = styled.a`
  text-align: right;
  color: black;
  font-size: 14px; 
`;


export const GenericButton = styled.button`
  background-color: #BB6CB9;
  color: white;
  padding: 14px 34px; 
  border-radius: 5px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); 
`;

export const CreateAccountButton = styled.button`
  background-color: white;
  color: #000;
  padding: 14px 16px; 
  border: 1px solid #BB6CB9;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
`;




export const RightContainer = styled.div`
  align-items: center;
  background: rgba(229, 229, 229, 0.41);
  height: 100vh;
`;

export const ImageContainer = styled.div`
  padding-top: 160px;  
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  max-width: 60%;
  max-height: 60%;
`;

export const Container = ({ children }) => {
    return <div className="container-fluid">{children}</div>;
};

export const Row = ({ children }) => {
    return <div className="row">{children}</div>;
};

export const Column = ({ children, size }) => {
    const columnClass = `col-md-${size || 6}`;
    return <div className={columnClass}>{children}</div>;
};