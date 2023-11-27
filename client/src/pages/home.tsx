import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import TaskPreview from "../components/TaskPreview";
import ErrorText from "../components/ErrorText";
import Header from "../components/Header";
import LoadingComponent from "../components/LoadingComponent";
import Navigation from "../components/Navigation";
import config from "../config/config";
import ITask from "../interfaces/task";
import IUser from "../interfaces/user";

const HomePage: React.FunctionComponent<{}> = (props) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.server.url}/tasks`,
      });

      if (response.status === (200 || 304)) {
        let tasks = response.data.tasks as ITask[];
        tasks.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));

        setTasks(tasks);
      } else {
        setError("Unable to retrieve tasks");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  if (loading) {
    return <LoadingComponent>Loading tasks...</LoadingComponent>;
  }

  return (
    <Container fluid className="p-0">
      <Navigation />
      <Header
        headline="Check out what people have to say"
        title="A Nerdy Task Website"
      />
      <Container className="mt-5">
        {tasks.length === 0 && (
          <p>
            There are no tasks yet. You should <Link to="/edit">post</Link> one
            😊.
          </p>
        )}
        {tasks.map((task, index) => {
          return (
            <div key={index}>
              <TaskPreview
                _id={task._id}
                author={(task.author as IUser).name}
                headline={task.headline}
                title={task.title}
                createdAt={task.createdAt}
                updatedAt={task.updatedAt}
              />
              <hr />
            </div>
          );
        })}
        <ErrorText error={error} />
      </Container>
    </Container>
  );
};

export default HomePage;
