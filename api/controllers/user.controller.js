import User from '../models/user.model'
import APIError from "../helpers/apiError";

export default class userController {
    static create = (req, res) => {
        if (!req.body.username) {
            res.status(400).send({message: "Content can not be empty!"});
            return;
        }

        const user = new User({
            username: req.body.username,
            // description: req.body.description,
            // published: req.body.published ? req.body.published : false
        });

        user
            .save(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    };

    static findAll = async (req, res) => {
        const title = req.query.title;
        let condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};
        try {
            const user = await User.find(condition)
            return res.json(user)
        } catch (err) {
            return new APIError(err.message || "Some error occurred while retrieving Users.")
        }
    }

    static findOne = (req, res) => {
        const id = req.params.id;

        User.findById(id)
            .then(data => {
                if (!data)
                    res.status(404).send({message: "Not found User with id " + id});
                else res.send(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Error retrieving User with id=" + id});
            });
    };

    static update = (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update User with id=${id}. Maybe User was not found!`
                    });
                } else res.send({message: "User was updated successfully."});
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    };

    static delete = (req, res) => {
        const id = req.params.id;

        User.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete User with id=${id}. Maybe User was not found!`
                    });
                } else {
                    res.send({
                        message: "User was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
    };

    static deleteAll = (req, res) => {
        User.deleteMany({})
            .then(data => {
                res.send({
                    message: `${data.deletedCount} Users were deleted successfully!`
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all Users."
                });
            });
    };

    static findAllPublished = (req, res) => {
        User.find({published: true})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Users."
                });
            });
    };

}

