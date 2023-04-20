import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 3rem 2rem;
  max-width: 700px;
  overflow: hidden;
  margin: auto;
`;

export const CardStyle = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 10px;
  margin: 1rem auto;
  max-width: 700px;
  position: relative;

  div p:nth-of-type(1) {
    font-weight: 600;
    text-transform: lowercase;
  }

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

  & span {
    background: var(--blue);
    color: var(--white);
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
  }
`;

export const Block = styled.div`
  @media (min-width: 768px) {
    width: 100%;
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
  min-height: 110px;
  max-height: max-content;
  background: none;
  outline: none;
  border: none;
  font-size: inherit;

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
    color: red;
  }
  @media (min-width: 768px) {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
`;
