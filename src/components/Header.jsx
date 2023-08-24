import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <HeaderWrapper>
      <Stack>
        <Typography
          variant="h4"
          component="p"
          sx={{
            color: 'common.white',
          }}
        >
          Pokemon
        </Typography>
        <Subtitle>Infinite Scroll</Subtitle>
      </Stack>
      <Avatar
        sx={{
          cursor: 'pointer',
          ml: 'auto',
          backgroundColor: 'background.paper',
          color: 'primary.dark',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'primary.customScale.100',
          },
        }}
      >
        AC
      </Avatar>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled((props) => (
  <Stack direction="row" alignItems="center" {...props} />
))(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
  padding: theme.spacing(1),
  margin: '0 auto',
  [theme.breakpoints.down('lg')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Subtitle = styled((props) => <Typography component="span" {...props} />)(
  ({ theme }) => ({
    ...theme.typography.caption,
    paddingLeft: theme.spacing(0.5),
    display: 'inline-block',
    textAlign: 'right',
    color: theme.palette.text.primary,

    //   [theme.breakpoints.up('sm')]: {
    //     fontSize: '2rem',
    //     lineHeight: '2.25rem',
    //   },
  })
);