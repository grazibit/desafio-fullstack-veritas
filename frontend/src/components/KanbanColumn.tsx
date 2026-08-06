import Col from 'react-bootstrap/Col';
import CardKanban from './CardKanban';
import type { Task } from '../App';

interface KanbanColumnProps{
    title: "A FAZER" | "EM PROGRESSO" | "CONCLUÍDAS";
    tasks?: Task[];
}
function KanbanColumn({ title, tasks = [] }: KanbanColumnProps) {
    return (
            <Col className="border p-3 m-2 rounded bg-light">
                <h3 className="text-center">{title}</h3>
                    {tasks.map((task) => (
                        <CardKanban 
                        key={task.id} 
                        title={task.title} 
                        description={task.description} />
                    ))}
            </Col>
    );
}

export default KanbanColumn;