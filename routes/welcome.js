/*
 * GET Items listing.
 */

var address = require("./getAddress");



exports.home = function(req,res){
	
	res.redirect("authenticate");
}


exports.updateProfile = function(req,res){
	
	res.render("updateProfile");
}

exports.list = function(req, res) {

	var uname = req.param('uname');
	var email = req.param('email');
	var mobile = req.param('mobile');
	var age = req.param('age');
	var occupation = req.param('occupation');
	var income = req.param('income');
	var password = req.param('pass');

	// Generating Public Address for new User here

	var public_address = address.getAddress();

	console.log("public key is " + public_address);

	req.getConnection(function(err, connection) {

				if (err)
					throw err;

				var insertQuery = "INSERT INTO codeathon.user_info (NAME, Password, Mobile, Email, Age, Income, Occupation,public_address) Values ( ?, ?, ?, ?, ?, ?, ?,?)";

				connection.query(insertQuery, [ uname, password, mobile, email,
						age, income, occupation, public_address ], function(
						err, rows) {

					if (err)
						console.log("Error Selecting : %s ", err);
					console.log(rows);

					/*
					 res.render('welcome', {
					 page_title : "Items_list",
					 data : rows
					 });*/

				});

			});
	
	
	
	
	
	
	
	
	
	
};
