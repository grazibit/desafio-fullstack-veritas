import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

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
                <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                    <Modal.Title className="fw-bold mb-0 text-start">
                        {task.title}
                    </Modal.Title>
                    <div className="d-flex align-items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-1 px-2 py-1"
                            style={{ fontSize: '0.85rem' }}
                            onClick={() => {
                                handleClose();
                                onEditClick(task.id, task.title, task.description);
                            }}>Editar</Button>
                        <Dropdown align="end">
                            <Dropdown.Toggle id="dropdown-custom-components" variant="light" size="sm"
                                className="text-secondary p-1 d-flex align-items-center justify-content-center bg-transparent border-0 shadow-none"
                                style={{ width: '32px', height: '32px', cursor: 'pointer' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', lineHeight: 1 }}>⋮</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="shadow-sm border-0" style={{ fontSize: '0.85rem' }}>
                                <Dropdown.Item
                                    className="text-danger fw-medium"
                                    onClick={() => {
                                        handleClose();
                                        onDelete(task.id);
                                    }}>Excluir
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
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