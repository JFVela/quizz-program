import React from "react";
import styled, { keyframes } from "styled-components";
import {
  IconButton,
  Avatar,
  Container,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import CodeIcon from "@mui/icons-material/Code";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const FooterWrapper = styled.footer`
  background: linear-gradient(-45deg, var(--color1), #16c47f, #ffd65a, black);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: white;
  padding: 3rem 0;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
  padding: 25px 0;
`;

const FooterContent = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  justify-content: space-around;
  width: 100%;
`;

const Perfil = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AvatarWrapper = styled(Box)`
  position: relative;
  margin-bottom: 0.8rem;

  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid white;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const SocialLinks = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: center;
`;

const StyledIconButton = styled(IconButton)`
  margin: 0 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent maxWidth="lg">
        <ProfileSection>
          <Perfil>
            <AvatarWrapper>
              <Avatar
                alt="Juan Fv"
                src="https://avatars.githubusercontent.com/u/129704208"
                sx={{ width: 60, height: 60 }}
              />
            </AvatarWrapper>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              Juan Fv
            </Typography>
          </Perfil>
          <div>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ maxWidth: "600px", mb: 2 }}
            >
              "Si se puede <b>IMAGINAR</b>, se puede <b>PROGRAMAR</b>".
            </Typography>
            <SocialLinks>
              <Tooltip title="GitHub">
                <StyledIconButton
                  aria-label="GitHub"
                  href="https://github.com/your-github-username"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon sx={{ color: "white", fontSize: 28 }} />
                </StyledIconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <StyledIconButton
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/in/your-linkedin-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon sx={{ color: "white", fontSize: 28 }} />
                </StyledIconButton>
              </Tooltip>
              <Tooltip title="Email">
                <StyledIconButton aria-label="Email" href="mailto:tu@email.com">
                  <EmailIcon sx={{ color: "white", fontSize: 28 }} />
                </StyledIconButton>
              </Tooltip>
              <Tooltip title="Portfolio">
                <StyledIconButton aria-label="Portfolio" href="/portfolio">
                  <CodeIcon sx={{ color: "white", fontSize: 28 }} />
                </StyledIconButton>
              </Tooltip>
            </SocialLinks>
          </div>
        </ProfileSection>

        <Typography variant="body2" sx={{ marginTop: 3, opacity: 0.8 }}>
          © {new Date().getFullYear()} Juan Fv. Todos los derechos reservados.
        </Typography>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
