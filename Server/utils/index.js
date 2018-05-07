const mongoose = require('mongoose');

module.exports = {
	sendJSONresponse: function (res, status, content) {
		res.status(status);
		res.json(content);
	},

	upsert: function (model, query, data, options, res) {
		model.findOneAndUpdate(query, data, options, function (err, data) {
			if (err) {
				res.status(400).json({
					success: false,
					message: err.message,
				});
				return;
			}
			res.status(200).json({
				success: true,
				message: "Personal Information Saved.",
				data: data,
			});
		});
	},

	save: function (model, res) {
		model.save(function (err, data) {
			if (err) {
				res.status(400).json({
					success: false,
					message: err.message,
				});
				return;
			}
			res.status(200).json({
				success: true,
				message: "Personal Information Saved.",
				data: data,
			});
		});
	},

	findOne: function (model, query, res) {
		model.findOne(query, function (err, data) {
			if (err) {
				res.status(400).json({
					success: false,
					message: err.message,
				});
				return;
			}
			res.status(200).json({
				success: true,
				message: "Personal Information Saved.",
				data: data,
			});
		});
	},

	find: function (model, query, res) {
		model.find(query, function (err, data) {
			if (err) {
				res.status(400).json({
					success: false,
					message: err.message,
				});
				return;
			}
			res.status(200).json({
				success: true,
				message: "Personal Information Saved.",
				data: data,
			});
		});
	},

};



