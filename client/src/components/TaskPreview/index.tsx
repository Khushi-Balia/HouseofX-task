import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

export interface ITaskPreviewProps {
    _id: string;
    title: string;
    headline: string;
    author: string;
    children?: React.ReactNode;
}

const TaskPreview: React.FunctionComponent<ITaskPreviewProps> = props => {
    const { children, author, _id, headline, title } = props;

    return (
        <Card className="border-0">
            <CardBody className="p-0">
                <Link 
                    to={`/tasks/${_id}`}
                    style={{ textDecoration: 'none' }}
                    className="text-light"
                >
                    <h1><strong>{title}</strong></h1>
                    <h3>{headline}</h3><br />
                </Link>
                
                {children}
            </CardBody>
        </Card>
    );
}

export default TaskPreview;