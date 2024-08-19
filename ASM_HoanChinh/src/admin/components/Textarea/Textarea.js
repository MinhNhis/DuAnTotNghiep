import React from 'react';
import { styled, TextField } from '@mui/material';

const StyledTextArea = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.grey[600],
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiOutlinedInput-multiline': {
    padding: '12px 14px',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
  marginBottom: theme.spacing(2),
}));

const Textarea = (props) => {
  return (
    <StyledTextArea
      id="outlined-multiline-static"
      label="Nội dung"
      multiline
      rows={4}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default Textarea;