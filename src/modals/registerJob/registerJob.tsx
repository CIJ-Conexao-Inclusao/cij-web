import React from 'react';
import { Modal, Button, Box } from '@mui/material';

interface RegisterJobsModalProps {
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

const RegisterJobsModal: React.FC<RegisterJobsModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Cadastrar Vagas</h2>
        <p id="modal-description">Formulário para cadastrar vagas vai aqui.</p>
        <Button onClick={onClose}>Fechar</Button>
      </Box>
    </Modal>
  );
};

export default RegisterJobsModal;