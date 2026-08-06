import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import KanbanColumn from './components/KanbanColumn';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

function App() {
  const minhasTarefas: Task[] = [
    { id: 1, title: "Estudar", description: "Estudar matemática", status: "A FAZER" },
    { id: 2, title: "Arrumar", description: "Arrumar o quarto", status: "EM PROGRESSO" },
    { id: 3, title: "Estudar Geografia", description: "Estudar o mapa do Brasil", status: "CONCLUÍDAS" },
    { id: 4, title: "Reunião", description: "Apresentação do trabalho", status: "CONCLUÍDAS" }
  ];

  return (
    <Container className="mt-5">
      <Row>
        <KanbanColumn 
          title="A FAZER" 
          tasks={minhasTarefas.filter(tarefa => tarefa.status === "A FAZER")} 
        />
        
        <KanbanColumn 
          title="EM PROGRESSO" 
          tasks={minhasTarefas.filter(tarefa => tarefa.status === "EM PROGRESSO")} 
        />
        
        <KanbanColumn 
          title="CONCLUÍDAS" 
          tasks={minhasTarefas.filter(tarefa => tarefa.status === "CONCLUÍDAS")} 
        />
      </Row>
    </Container>
  );
}

export default App;