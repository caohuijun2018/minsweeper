import styled from "styled-components";
import Image from "../Img/bg.png";

export const BoardAllStyled = styled.div`
  display: block;
  text-align: center;
`;
export const GameStatusStyled = styled.div`
  margin-bottom: 20px;
  background: rgb(213, 223, 255, 0.4);
  padding: 7px;
  text-align: center;
  color: #00008b;
  border-radius: 7px;
  font-family: Lobster;
  font-size: larger;
  display: inline-block;
  font-size: 1em;
`;
export const ButtonPosStyled = styled.div`
  display: flex;
  justify-content: center;
`;
export const BoardStyled = styled.div`
  background: url(${Image}) #000;
  background-size: cover;
  background-repeat: repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "Lobster";
`;
