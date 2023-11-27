import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Task from '../models/task';
import mongoose from 'mongoose';

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create task ...');

    let { author, title, content, headline, picture } = req.body;

    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        content,
        headline,
        picture
    });

    return task
        .save()
        .then((newTask) => {
            logging.info(`New task created`);

            return res.status(201).json({ task: newTask });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.taskID;
    logging.info(`Incoming read for task with id ${_id}`);

    Task.findById(_id)
        .populate('author')
        .exec()
        .then((task) => {
            if (task) {
                return res.status(200).json({ task });
            } else {
                return res.status(404).json({
                    error: 'Task not found.'
                });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                error: error.message
            });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Returning all tasks ');

    Task.find()
        .populate('author')
        .exec()
        .then((tasks) => {
            return res.status(200).json({
                count: tasks.length,
                tasks: tasks
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const query = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Query route called');

    Task.find(req.body)
        .populate('author')
        .exec()
        .then((tasks) => {
            return res.status(200).json({
                count: tasks.length,
                tasks: tasks
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const update = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Update route called');

    const _id = req.params.taskID;

    Task.findById(_id)
        .exec()
        .then((task) => {
            if (task) {
                task.set(req.body);
                task.save()
                    .then((savedTask) => {
                        logging.info(`Task with id ${_id} updated`);

                        return res.status(201).json({
                            task: savedTask
                        });
                    })
                    .catch((error) => {
                        logging.error(error.message);

                        return res.status(500).json({
                            message: error.message
                        });
                    });
            } else {
                return res.status(401).json({
                    message: 'NOT FOUND'
                });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const deleteTask = (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.taskID;

    Task.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'Task deleted'
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

export default {
    create,
    read,
    readAll,
    query,
    update,
    deleteTask
};
