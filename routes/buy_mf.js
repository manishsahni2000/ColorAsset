exports.buy_mf = function(req, res) {
	
	var sess=req.session;
	
	var username = sess.username;
	
	// Query for fetching the records of the USER 
	
	req.getConnection(function(err, connection) {

		if (err)
			throw err;

		var fetchRecords = "SELECT asi.ID,  asi.asset_id, asi.asset_name, asi.issuance_address, asi.risk_profile, nav.nav FROM codeathon.asset_info asi INNER JOIN codeathon.navupdater nav ON asi.id = nav.asset_id "
		connection.query(fetchRecords, [ username ]
				, function(err, rows) {

			if (err)
				console.log("Error Selecting : %s ", err);
				
			
			console.log(rows);

			res.render('buy_mf', {data : rows });
			
		});

	});	

};