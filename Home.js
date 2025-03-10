import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align upwards */
  align-items: center;
  height: 100vh;
  padding-top: 10%; /* Push content upward */
  color: white;
  text-align: center;
`;

const TextContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent black box */
  padding: 20px 40px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Heading = styled(motion.h1)`
  font-size: 4.5rem; /* Larger font size */
  font-weight: bold;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 15px 0;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
`;

const HighlightedText = styled.span`
  color: #007aff; /* Apple-like blue color */
`;
const HighlightedText2 = styled.span`
  color:rgb(255, 242, 0); /* Apple-like blue color */
`;

export default function Home() {
  return (
    <Container>
      {/* Semi-Transparent Box */}
      <TextContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Heading>
          Welcome to <HighlightedText2>BOAT</HighlightedText2>
        </Heading>
        <Heading>
          <HighlightedText>R</HighlightedText>eservation AND <HighlightedText>R</HighlightedText>ental
        </Heading>
      </TextContainer>
    </Container>
  );
}