import { Container, Grid, Typography } from "@mui/material";

/**
 * Componente que representa el pie de página de la aplicación.
 * @function
 * @returns {React.Element} - Elemento que contiene la información de copyright y el nombre de la empresa.
 */
const Footer = () => {
  return (
    <Grid>
      <Container>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          mt={2}
          mb={2}
        >
          {"Copyright © "}
          {new Date().getFullYear()}
          {" Cencosud - Dumbo"}
        </Typography>
      </Container>
    </Grid>
  );
};

export default Footer;
