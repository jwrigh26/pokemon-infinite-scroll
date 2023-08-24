import { useIntersect } from 'hooks/useIntersect';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { usePokemonQuery } from 'services/pokemon';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


// Sample data
const cards = [
  { title: 'Card 1', content: 'Content 1' },
  { title: 'Card 2', content: 'Content 2' },
  // Add more cards as needed
];

export default function PokemonList() {
  const { data, isLoading, isFetching } = usePokemonQuery();
  console.log(data);
  return (
    <Grid>
      {cards.map((card, index) => (
        <PokemonCard key={index}>
          <CardContent>
            <Typography variant="h5">{card.title}</Typography>
            <Typography variant="body2">{card.content}</Typography>
          </CardContent>
        </PokemonCard>
      ))}
    </Grid>
  );
}

PokemonList.propTypes = {};

// Styled container to hold the cards
const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 0),
    gridTemplateColumns: '1fr 1fr',
  },
}));

// Styled individual card
const PokemonCard = styled(Card)(({ theme }) => ({
  flex: '0 0 auto',
  width: '100%',
  height: 'min(30svh, 320px)',
}));
