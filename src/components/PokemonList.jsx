import { useState, useEffect } from 'react';
import { useIntersect } from 'hooks/useIntersect';
import { styled } from '@mui/material/styles';
import { usePokemonQuery } from 'services/pokemon';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function PokemonList() {
  const [currentOffset, setCurrentOffset] = useState(0);

  const { data, isLoading, isFetching } = usePokemonQuery({
    offset: currentOffset ?? 0,
    limit: 5,
  });
  const { pagination, results } = data ?? {};
  const { offset: nextOffset } = pagination?.next ?? { offest: 0 };

  const [ref, isIntersecting] = useIntersect({
    root: null, // Viewport is the observer root
    rootMargin: '0px 0px 128px 0px',
    threshold: 0,
  });

  useEffect(() => {
    if (
      !isLoading &&
      !isFetching &&
      isIntersecting &&
      currentOffset != nextOffset
    ) {
      console.log('Setting current offset:', nextOffset);
      setCurrentOffset(nextOffset);
    }
  }, [isLoading, isFetching, isIntersecting, currentOffset, nextOffset]);

  return (
    <>
      <Grid>
        {results?.map((card) => (
          <PokemonCard key={`${card.name}-${card.id}`}>
            <CardContent>
              <PokemonCardHeader name={card?.name} id={card?.id} />
              <ImageWrapper>
                <PokemonImage
                  src={card?.image}
                  alt={`${card?.name}-official-image`}
                />
              </ImageWrapper>
            </CardContent>
          </PokemonCard>
        ))}
      </Grid>
      <Box
        id="scroll-intersect-target"
        sx={{ width: '100%', height: '1px' }}
        ref={ref}
      />
      {isFetching && results?.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}

PokemonList.propTypes = {};

function PokemonCardHeader({ name, id }) {
  return (
    <HeaderStack>
      <Typography variant="h5">{name}</Typography>
      <PokemonId>#{id}</PokemonId>
    </HeaderStack>
  );
}

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
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}));

// Styled individual card
const PokemonCard = styled(Card)(({ theme }) => ({
  flex: '0 0 auto',
  width: '100%',
  height: 'min(40svh, 420px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '256px',
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: theme.palette.secondary.light,
}));

const PokemonImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto' /* This ensures the aspect ratio is maintained */,
}));

const HeaderStack = styled((props) => (
  <Stack
    direction="row"
    alignItems="baseline"
    justifyContent="flex-start"
    {...props}
  />
))(({ theme }) => ({
  padding: theme.spacing(2),
}));

const PokemonId = styled(Avatar)(({ theme }) => ({
  ...theme.typography.subtitle1,
  backgroundColor: theme.palette.secondary.light,
  fontWeight: 'bold',
  marginLeft: 'auto',
}));
