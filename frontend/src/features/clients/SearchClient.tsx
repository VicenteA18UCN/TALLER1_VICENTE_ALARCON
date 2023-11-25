import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

/**
 * Interfaz para las propiedades del componente SearchClient.
 * @interface Props
 * @property {function} handleSearch - Función que maneja la búsqueda, toma un parámetro `id` de tipo string y no devuelve nada.
 */
interface Props {
  handleSearch: (id: string) => void;
}

/**
 * Estilo para el contenedor de búsqueda.
 * @typedef {object} SearchStyle
 * @property {string} position - Posición del contenedor.
 * @property {string} borderRadius - Radio del borde del contenedor.
 * @property {string} backgroundColor - Color de fondo con opacidad.
 * @property {object} "&:hover" - Estilo aplicado al pasar el ratón sobre el contenedor.
 * @property {string} marginLeft - Margen izquierdo.
 * @property {string} width - Ancho del contenedor.
 */

/**
 * Estilo para el contenedor de búsqueda.
 * @type {SearchStyle}
 */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

/**
 * Estilo para el contenedor del icono de búsqueda.
 * @typedef {object} SearchIconWrapperStyle
 * @property {string} padding - Relleno del contenedor.
 * @property {string} height - Altura del contenedor.
 * @property {string} position - Posición del contenedor.
 * @property {string} pointerEvents - Propiedad de eventos de puntero.
 * @property {string} display - Tipo de visualización del contenedor.
 * @property {string} alignItems - Alineación de elementos dentro del contenedor.
 * @property {string} justifyContent - Alineación del contenido principal del contenedor.
 */

/**
 * Estilo para el contenedor del icono de búsqueda.
 * @type {SearchIconWrapperStyle}
 */
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

/**
 * Estilo para la entrada de búsqueda.
 * @typedef {object} StyledInputBaseStyle
 * @property {string} color - Color del texto.
 * @property {object} "& .MuiInputBase-input" - Estilo específico para la entrada de texto dentro del componente InputBase de Material-UI.
 * @property {string} padding - Relleno de la entrada de texto.
 * @property {string} paddingLeft - Relleno izquierdo que tiene en cuenta el icono de búsqueda.
 * @property {string} transition - Transición aplicada al ancho durante el cambio de estado.
 * @property {string} width - Ancho inicial de la entrada de texto.
 * @property {object} [theme.breakpoints.up("sm")] - Estilos específicos para pantallas con un breakpoint (punto de quiebre) mayor o igual a "sm".
 * @property {string} [theme.breakpoints.up("xl")] - Estilos específicos para pantallas con un breakpoint (punto de quiebre) mayor o igual a "xl".
 */

/**
 * Estilo para la entrada de búsqueda.
 * @type {StyledInputBaseStyle}
 */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "22ch",
      "&:focus": {
        width: "28ch",
      },
    },
    [theme.breakpoints.up("xl")]: {
      width: "36ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

/**
 * Componente funcional SearchClient.
 * @component
 * @param {Props} props - Propiedades del componente.
 * @returns {React.Element} - Elemento de búsqueda estilizado con Material-UI y Styled Components.
 */
const SearchClient = ({ handleSearch }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar por rut o correo electrónico..."
            inputProps={{ "aria-label": "search" }}
            sx={{ p: 1 }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Search>
      </Toolbar>
    </Box>
  );
};

export default SearchClient;
