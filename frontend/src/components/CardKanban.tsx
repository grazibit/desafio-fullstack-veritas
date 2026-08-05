import Card from 'react-bootstrap/Card';

interface CardKanbanProps{
    title: string;
    description: string;
}

function CardKanban(props: CardKanbanProps){
    return(
        <Card border="primary" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default CardKanban;