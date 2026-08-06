import Col from 'react-bootstrap/Col';
import CardKanban from './CardKanban';
import Button from 'react-bootstrap/Button';
import React from 'react';
import type { Task } from '../App';

interface KanbanColumnProps {
    title: "A Fazer" | "Em Progresso" | "Concluídas";
    tasks?: Task[];
    onViewClick: (id: number, title: string, description: string, status: string) => void;
    onAddClick?: () => void; 
    onDropTask: (taskId: number, newStatus: string) => void;
}

function KanbanColumn({ title, tasks = [], onViewClick, onAddClick, onDropTask }: KanbanColumnProps) {
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const draggedTaskId = event.dataTransfer.getData("taskId");
        if (draggedTaskId) {
            onDropTask(parseInt(draggedTaskId), title);
        }
    };

    return (
        <Col className="border p-3 m-2 rounded bg-light" onDragOver={handleDragOver} onDrop={handleDrop}>
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