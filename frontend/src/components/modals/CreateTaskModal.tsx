import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface CreateTaskModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (title: string, description: string) => void;
}

function CreateTaskModal({ show, handleClose, handleSave }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);

  const onConfirm = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    handleSave(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Nova Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Digite o título da tarefa..." 
              value={title}
              onChange={(e) => { 
                setTitle(e.target.value);
                setTitleError(false);
              }}
              isInvalid={titleError}
              autoFocus 
            />
          <Form.Control.Feedback type="invalid">O título da tarefa é obrigatório.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Descreva os detalhes da tarefa..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm}>Salvar Tarefa</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTaskModal;