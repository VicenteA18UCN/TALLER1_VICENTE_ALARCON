import { Container, Grid, Typography } from "@mui/material";

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
