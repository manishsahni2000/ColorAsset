/*
 * GET home page.
 */
 




exports.authenticate = function(req, res) {

	var username = req.param('user_id');
	var password = req.param('password');
	console.log(password);
	
	var sess=req.session;
	
	sess.username = req.param('user_id');

	req.getConnection(function(err, connection) {

				if (err)
					throw err;
				connection
						.query(
								'SELECT COUNT(*) FROM USER_INFO WHERE name = ? AND PASSWORD = ? ',
								
								[ username, password ],
								function(err, rows) {

									if (err)
										console.log("Error Selecting : %s ",
												err);
									
									console.log(rows.length);
									
									/*if(rows.length == 1)
									res.redirect('/dashboard/' + req.param('user_id'));*/

								});

			});
	
	// Query for fetching the records of the USER 
	
	exports.fetchFunds = req.getConnection(function(err, connection) {

		if (err)
			throw err;

		var fetchRecords = "SELECT txn.asset_id, asi.asset_name, txn.units, txn.curr_nav, usi.name, (txn.units*txn.curr_nav) AS NET_MARKET_VALUE , usi.name,usi.mobile,usi.email,usi.age , usi.public_address FROM codeathon.transaction AS txn INNER JOIN codeathon.asset_info AS asi ON asi.id=txn.asset_id INNER JOIN codeathon.user_info AS usi ON txn.user_id = usi.id WHERE txn.user_id = (SELECT id FROM user_info WHERE NAME = ?)";

		connection.query(fetchRecords, [ username ]
				, function(err, rows) {

			if (err)
				console.log("Error Selecting : %s ", err);
				
			
			console.log(rows);

			
			res.render('dashboard', {data : rows });
			
			
		});

	});
	
	
	
	
	
	

};