var UserModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {


    create: async function(req, res) {
        const { name, username, email, phone, website, address, company } = req.body;

        // Preverimo, če so vsi potrebni podatki prisotni
        if (!name || !username || !email) {
          return res.status(400).json({ message: "Podatki name, username, email so obvezni." });
        }
      
        try {
          // Ustvarimo novega uporabnika
          const newUser = new UserModel({
            name,
            username,
            email,
            phone,
            website,
            address,
            company
          });
      
          // Shranimo uporabnika v bazo
          await newUser.save();
      
          // Pošljemo uspešen odgovor
          return res.status(201).json({
            message: "Uporabnik uspešno dodan",
            user: newUser
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Napaka pri dodajanju uporabnika." });
        }
    },

    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },


    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },


    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

 
};
