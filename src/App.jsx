import { styled } from '@mui/material/styles';
import background from 'assets/background.svg';
import Box from '@mui/material/Box';
import FooterContent from 'components/Footer';
import HeaderContent from 'components/Header';
import PokemonList from 'components/PokemonList';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <Root>
      <Header>
        <HeaderContent />
      </Header>
      <Main>
        <PokemonList />
      </Main>
      <FooterWrapper>
        <FooterContent />
      </FooterWrapper>
    </Root>
  );
}

export default App;

// App Styled Components
const Main = styled((props) => <Box component="main" id="pokemon-main" {...props} />)(
  ({ theme }) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.customScale[50],
    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255, 1) 0%, rgba(255,255,255,0) 30%)`,
  })
);

const Header = styled((props) => <Box component="header" {...props} />)(
  ({ theme }) => ({
    ...theme.shape.backgroundGradient,
  })
);

const FooterWrapper = styled((props) => <Box component="footer" {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    marginTop: 'auto',
  })
);

// Root Styled Components
const Root = styled((props) => (
  <Stack id="pokemon-infinte-scroll-main" {...props} />
))(({ theme }) => ({
  flexGrow: 1, // This works based on User Root's flex display
  minHeight: '100svh', // Full viewport height
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
}));
