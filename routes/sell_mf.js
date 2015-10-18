exports.sell_mf = function(req, res) {
	
	var sess=req.session;
	
	var username = sess.username;
	
	console.log("username "+username);
	
	// Query for fetching the records of the USER 
	
	req.getConnection(function(err, connection) {

		if (err)
			throw err;

		var fetchRecords = " SELECT asi.asset_id, asi.asset_name, asi.issuance_address, SUM(txn.units) AS Total_Units, txn.curr_nav, txn.txn_type, usi.id, asi.id  FROM codeathon.asset_info asi  INNER JOIN codeathon.transaction txn ON asi.id = txn.asset_id  INNER JOIN codeathon.user_info usi ON txn.user_id = usi.id WHERE usi.name = ? AND txn.txn_type = 'BUY' OR txn.txn_type = 'SELL' GROUP BY asi.asset_name"
			connection.query(fetchRecords, [ username ]
				, function(err, rows) {

			if (err)
				console.log("Error Selecting : %s ", err);
				
			
			console.log(rows);

			res.render('sell_mf', {data : rows });
			
		});

	});	

};