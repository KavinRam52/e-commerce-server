import User from "../models/user.js";


export const createUser = (req, res) => {
    new User(req.body)
        .save()
        .then((user) => res.status(201).json({ success: true, messgae: "User created successfully", user: user }))
        .catch((error) => res.status(400).json({ succes: false, message: error }));

};

export const getAllUsers = (req, res) => {

    User.find()
        .then((users) => res.status(200).json({ succes: true, users: users }))
        .catch((error) => res.status(400).json({ succes: false, message: error }));
};

export const getSingleUser = (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then((user) => res.status(200).json({ succes: true, user: user }))
        .catch((error) => res.status(400).json({ succes: false, message: `No user found with this ${id}` }));
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const newData = req.body;
    User.findByIdAndUpdate(id, {
        userName: newData.userName,
        email: newData.email,
        password: newData.password,
        phoneNumber: newData.phoneNumber,
        profilePic: newData.profilePic
    }, { new: true })
        .then((updatedUser) => res.status(200).json({ success: true, message: `User updated successfully`, updatedUser: updatedUser }))
        .catch((error) => res.status(400).json({ succes: false, message: `No user found with this ${id}` }));



};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
        .then((deletedUser) => res.status(200).json({ message: true, message: `User with the id:${id} is deleted successfully`, deletedUser: deletedUser }))
        .catch((error) => res.status(400).json({ succes: false, message: `No user found with this ${id}` }));

};