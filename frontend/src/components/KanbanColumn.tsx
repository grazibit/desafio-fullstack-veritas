import Col from 'react-bootstrap/Col';
import CardKanban from './CardKanban';
import Button from 'react-bootstrap/Button';
import type { Task } from '../App';

interface KanbanColumnProps {
    title: "A FAZER" | "EM PROGRESSO" | "CONCLUÍDAS";
    tasks?: Task[];
    onViewClick: (id: number, title: string, description: string, status: string) => void;
    onAddClick?: () => void; 
}

function KanbanColumn({ title, tasks = [], onViewClick, onAddClick }: KanbanColumnProps) {
    return (
        <Col className="border p-3 m-2 rounded bg-light">
            <h3 className="text-center">{title}</h3>
            {onAddClick && (
                <Button variant="outline-primary" className="w-100 mb-3" onClick={onAddClick}>
                    + Nova Tarefa
                </Button>
            )}
            {tasks.map((task) => (
                <CardKanban 
                    key={task.ID}
                    id={task.ID}
                    title={task.Title}
                    description={task.Description}
                    status={task.Status}
                    onViewClick={onViewClick}
                />
            ))}
        </Col>
    );
}

export default KanbanColumn;