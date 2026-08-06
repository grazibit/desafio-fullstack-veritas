import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import KanbanColumn from './components/KanbanColumn';
import CreateTaskModal from './components/modals/CreateTaskModal'; 
import EditTaskModal from './components/modals/EditTaskModal';
import ViewTaskModal from './components/modals/ViewTaskModal'; 

export interface Task {
  ID: number;
  Title: string;
  Description: string;
  Status: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); 

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<{ id: number; title: string; description: string } | null>(null);

  const openEditModal = (id: number, title: string, description: string) => {
    setTaskToEdit({ id, title, description });
    setShowEditModal(true);
  };
  
  const closeEditModal = () => {
    setTaskToEdit(null);
    setShowEditModal(false);
  };

  const [showViewModal, setShowViewModal] = useState(false);
  const [taskToView, setTaskToView] = useState<{ id: number; title: string; description: string; status: string } | null>(null);

  const openViewModal = (id: number, title: string, description: string, status: string) => {
    setTaskToView({ id, title, description, status });
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setTaskToView(null);
    setShowViewModal(false);
  };

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const createTask = (title: string, description: string) => {
    const newTask = {
      Title: title,
      Description: description,
      Status: "A FAZER"
    };

    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(data => {
      setTasks(prevTasks => [...prevTasks, data]);
      handleClose();
    })
    .catch(error => console.error('Erro ao criar tarefa:', error));
  }

  const updateTask = (id: number, title: string, description: string) => {
    const taskToUpdate = tasks.find(task => task.ID === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, Title: title, Description: description };
    
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
    .then(response => {
      if (response.ok) {
        setTasks(prevTasks => prevTasks.map(task => task.ID === id ? updatedTask : task));
      }
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
  };

  const deleteTask = (id: number) => {
    fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) setTasks(prevTasks => prevTasks.filter(task => task.ID !== id));
    })
    .catch(error => console.error('Erro ao deletar tarefa:', error));
  };

  return (
    <Container className="mt-5">
      <Row>
        <KanbanColumn title="A FAZER" tasks={tasks.filter(t => t.Status === "A FAZER")} onViewClick={openViewModal} onAddClick={handleShow} />
        <KanbanColumn title="EM PROGRESSO" tasks={tasks.filter(t => t.Status === "EM PROGRESSO")} onViewClick={openViewModal} />
        <KanbanColumn title="CONCLUÍDAS" tasks={tasks.filter(t => t.Status === "CONCLUÍDAS")} onViewClick={openViewModal} />
      </Row>

      <CreateTaskModal show={showModal} handleClose={handleClose} handleSave={createTask} />
      <EditTaskModal show={showEditModal} handleClose={closeEditModal} handleSave={updateTask} task={taskToEdit} />
      <ViewTaskModal show={showViewModal} handleClose={closeViewModal} task={taskToView} onEditClick={openEditModal} onDelete={deleteTask} 
      />
    </Container>
  );
}

export default App;