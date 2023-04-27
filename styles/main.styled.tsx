import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 3rem 2rem;
  max-width: 800px;
  overflow: hidden;
  margin: auto;
`;

export const CardStyle = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 10px;
  margin: 1rem auto;
  position: relative;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
  }
`;

export const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;

  & p:nth-of-type(1) {
    font-weight: 600;
    text-transform: lowercase;
  }

  & span {
    background: var(--blue);
    color: var(--white);
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
  }
`;

export const Block = styled.div`
  display: block;
  font-weight: 400 !important;
  & > span {
    position: relative;
    padding: 0.5rem 0 1.5rem;
    display: block;
  }

  & button {
    position: absolute;
    right: 0;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;
export const ContentTextStyle = styled.p`
  & span {
    color: var(--blue);
    font-weight: 600;
  }
`;

export const PrimaryButton = styled.button`
  background: var(--blue);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  align-self: flex-end;

  &:hover {
    background: #a9abda;
  }
`;

export const ImageStyle = styled.image`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const ScoreCountContainer = styled.div`
  display: flex;
  gap: 0;
  border-radius: 5px;
  overflow: hidden;
  color: var(--borderColor);

  & :hover {
    color: var(--blue);
  }

  & button:nth-child(2) {
    color: var(--blue);
  }

  @media (min-width: 768px) {
    flex-direction: column;
    margin: 0;
  }
`;

export const TextAreaStyle = styled.textarea`
  min-width: 100%;
  background: none;
  outline: none;
  border: 2px solid var(--borderColor);
  font-size: inherit;
  font-weight: 400;
  padding: 0.5rem 1rem;

  @media (min-width: 768px) {
    min-height: 80px;
  }
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  color: var(--blue);

  div button {
    background: var(--grey);
    border: none;
    padding: 0.3rem 0.7rem;
  }
`;

export const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;

  @media (min-width: 768px) {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;

export const ReplyContainerStyle = styled.div`
  max-width: 90%;
  position: relative;
  margin-left: 10%;

  hr {
    height: 100%;
    border: 1px solid var(--borderColor);
    position: absolute;
    top: 0;
    left: -7%;
    z-index: 1;
  }
`;

export const AddCommentStyle = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  background: var(--white);
  padding: 2rem;
  border-radius: 10px;

  & textarea {
    border: 2px solid var(--borderColor);
    width: 100%;
    min-height: 100px;
    outline: none;
    padding: 0.5rem;
    border-radius: 5px;
  }

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    justify-content: start;

    & textarea {
      width: 150;
      flex-basis: 80%;
      order: 1;
    }

    & button {
      order: 2;
      width: max-content;
      height: max-content;
    }

    & button:hover {
      background: #a9abda;
    }
  }
`;

export const SendButton = styled.button`
  background: var(--blue);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: right !important;
  width: max-content;

  & button {
    display: flex;
    height: max-content;
    padding: 0.5rem 1rem;
    background: none !important;
    align-items: center;
    gap: 5px;
  }

  & :nth-child(1) {
    color: var(--red);
  }
  @media (min-width: 768px) {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
`;

export const Loader = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 0.5s infinite;
  font-size: 2rem;

  --color: ${({ color }) => color};

  @keyframes pulse {
    0% {
      color: var(--color);
    }
    50% {
      opacity: 0;
    }
    100% {
      color: var(--color);
    }
  }
`;

export const DeleteWarningStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  z-index: 2;

  body {
    width: 50px !important;
  }
  & div {
    width: 90%;
    margin: auto;
    background: var(--white);
    border-radius: 10px;
    padding: 1rem 0.5rem;
    max-width: 400px;

    & div h4 {
      margin: 0.5rem 0;
      font-size: 18px;
      text-transform: capitalize;
    }
  }

  & > div {
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.4);
  }

  & > div :last-child {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  & div button {
    padding: 0.5rem 1rem;
    color: var(--white);
    border-radius: 5px;
    background: var(--red);
    transition: 0.5s ease-in-out;
  }

  & div button:hover {
    background: #f6b1b3;
  }

  & > div :last-child :first-child {
    background: var(--darkGrey);
  }

  & > div :last-child :first-child:hover {
    background: #b3b8be;
  }
`;
