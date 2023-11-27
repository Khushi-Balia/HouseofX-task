import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, RouteComponentProps, useHistory, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ErrorText from '../components/ErrorText';
import Header from '../components/Header';
import LoadingComponent, { Loading } from '../components/LoadingComponent';
import Navigation from '../components/Navigation';
import config from '../config/config';
import UserContext from '../contexts/user';
import ITask from '../interfaces/task';
import IUser from '../interfaces/user';

const TaskPage: React.FunctionComponent<RouteComponentProps<any>> = props => {
    const [_id, setId] = useState<string>('');
    const [task, setTask] = useState<ITask|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [modal, setModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const { user } = useContext(UserContext).userState;
    const history = useHistory();
    
    useEffect(() => {
        let _taskId = props.match.params.taskID;

        if (_taskId) 
        {
            setId(_taskId);
        }
        else
        {
            history.push('/');
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (_id !== '')
            getTask();
        
        // eslint-disable-next-line
    }, [_id])

    const getTask = async () => {
        try 
        {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/tasks/read/${_id}`,
            });

            if (response.status === (200 || 304))
            { 
                setTask(response.data.task);
            }
            else
            {
                setError(`Unable to retrieve task ${_id}`);
            }
        } 
        catch (error) 
        {
            setError(error.message);
        }
        finally
        {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    const deleteTask = async () => {
        setDeleting(true);

        try 
        {
            const response = await axios({
                method: 'DELETE',
                url: `${config.server.url}/tasks/${_id}`,
            });

            if (response.status === 201)
            {
                setTimeout(() => {
                    history.push('/');
                }, 1000); 
            }
            else
            {
                setError(`Unable to retrieve task ${_id}`);
                setDeleting(false);
            }
        } 
        catch (error) 
        {
            setError(error.message);
            setDeleting(false);
        }
    }    

    
    if (loading) return <LoadingComponent>Loading Task ...</LoadingComponent>;

    if (task)
    {
        return (
            <Container fluid className="p-0">
                <Navigation />
                <Modal isOpen={modal}>
                    <ModalHeader>Delete</ModalHeader>
                        <ModalBody>
                            {deleting ?
                                <Loading />
                            :
                                "Are you sure you want to delete this task?"   
                            }
                            <ErrorText error={error} />
                        </ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={() => deleteTask()}>Delete Permanently</Button>
                    <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Header
                    image={task.picture || undefined}
                    headline={task.headline}
                    title={task.title}
                >
                    <p className="text-white">Posted by {(task.author as IUser).name} on {new Date(task.createdAt).toLocaleString()}</p>
                </Header>
                <Container className="mt-5">
                    {user._id === (task.author as IUser)._id &&
                        <Container fluid className="p-0">
                            <Button color="info" className="mr-2" tag={Link} to={`/edit/${task._id}`}><i className="fas fa-edit mr-2"></i>Edit</Button>
                            <Button color="danger" onClick={() => setModal(true)}><i className="far fa-trash-alt mr-2"></i>Delete</Button>
                            <hr />
                        </Container>
                    }
                    <ErrorText error={error} />
                    <div dangerouslySetInnerHTML={{ __html: task.content }} />
                </Container>
            </Container>
        )
    }
    else
    {
        return <Redirect to='/' />;
    }
}

export default withRouter(TaskPage);