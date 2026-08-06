import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

interface ViewTaskModalProps {
    show: boolean;
    handleClose: () => void;
    task: { id: number; title: string; description: string; status: string } | null;
    onEditClick: (id: number, title: string, description: string) => void;
    onDelete: (id: number) => void;
}

function ViewTaskModal({ show, handleClose, task, onEditClick, onDelete }: ViewTaskModalProps) {
    if (!task) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <div className="d-flex w-100 justify-content-between align-items-center me-3">
                    <Modal.Title>{task.title}</Modal.Title>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="link" className="text-dark p-0 border-0 text-decoration-none shadow-none" id="dropdown-actions">
                            <i className="bi bi-three-dots-vertical fs-4"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {
                                handleClose(); 
                                onEditClick(task.id, task.title, task.description); 
                            }}>
                                Editar
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger" onClick={() => {
                                handleClose();
                                onDelete(task.id);
                            }}>
                                 Excluir
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Status atual:</strong> <span className="badge bg-secondary">{task.status}</span></p>
                <h5 className="mt-4">Descrição:</h5>
                <p style={{ whiteSpace: 'pre-wrap' }}>{task.description}</p>
            </Modal.Body>
        </Modal>
    );
}

export default ViewTaskModal;