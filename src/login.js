import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  padding: 20px;
  background: white;
  border-radius: 5px;
  max-width: ${(props) => (props.type ? "400px" : "100%")};
  text-align: center;
  & input {
    padding: 10px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  & button {
    background: teal;
    padding: 12px 20px;
    width: 100%;
    border: none;
    color: white;
    border-radius: 3px;
  }
`;

const Login = (props) => {
  return (
    <StyledForm {...props}>
      <h2>Login</h2>
      <input placeholder="Email" />
      <input placeholder="password" />
      <button>Login</button>
    </StyledForm>
  );
};
export default Login;
