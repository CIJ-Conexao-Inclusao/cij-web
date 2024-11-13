import React from 'react';
import { Modal, Button, Box } from '@mui/material';

interface RegisterNoticeModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RegisterNoticeModal: React.FC<RegisterNoticeModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Cadastrar Notícia</h2>
        <p id="modal-description">Formulário para cadastrar Notícias vai aqui.</p>
        <Button onClick={onClose}>Fechar</Button>
      </Box>
    </Modal>
  );
};

export default RegisterNoticeModal;