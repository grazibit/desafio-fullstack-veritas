import Card from 'react-bootstrap/Card';

interface CardKanbanProps {
    id: number;
    title: string;
    description: string;
    status: string;
    onViewClick: (id: number, title: string, description: string, status: string) => void;
}

function CardKanban(props: CardKanbanProps) {
    return (
        <Card border="primary" className="mb-3 shadow-sm" style={{ width: '18rem', cursor: 'pointer' }} 
            onClick={() => props.onViewClick(props.id, props.title, props.description, props.status)}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text className="text-muted text-truncate">
                    {props.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardKanban;