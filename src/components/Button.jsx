import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import useTheme from '@mui/material/styles/useTheme';

export default function Button({
  children,
  loading = false,
  loadingPosition = 'center',
  variant = 'contained',
  sx = [],
  ...props
}) {
  const theme = useTheme();

  return (
    <LoadingButton
      loading={loading}
      variant={variant}
      sx={{ ...theme.shape.button, ...sx }}
      loadingPosition={loadingPosition}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  loadingPosition: PropTypes.string,
  variant: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};