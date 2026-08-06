import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface EditTaskModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (id: number, title: string, description: string) => void;
  task: { id: number; title: string; description: string } | null;
}

function EditTaskModal({ show, handleClose, handleSave, task }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const onConfirm = () => {
    if (task) {
      handleSave(task.id, title, description);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              autoFocus 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm}>Salvar Alterações</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;