//var sendAssets = require("./sendAssets");

var Colu = require('colu');


var public_Key ;
var assetid;





exports.Sell = function(req, res) {
	
	
	var assetname = req.param('assetname');
	assetid = req.param('assetid');
	var assetquantity = req.param('assetquantity');
	var from_addr = req.param('issuance_address');

	console.log("from_addr "+from_addr);

	var sess=req.session;

	var username = sess.username;




	

	console.log("username is "+username);

		
	console.log("asset id is "+assetid);
	
	
	
	
	
	
req.getConnection(function(err, connection) {

	if (err)
		throw err;
	connection
			.query(
					"SELECT public_address FROM codeathon.user_info WHERE NAME = ?",
					
					[ username ],
					function(err, rows) {

						if (err)
							console.log("Error Selecting : %s ",
									err);
						
						console.log(rows);
						console.log("Public key is "+rows[0].public_address);
						
						public_Key = rows[0].public_address;
						
						
						
						

						// Code for Inserting records into BlockkChain
							
						

							
						

						var privateSeed = 'd560c1c1d4a9179421b4d4f9b11a344222629f72a63239a7f6ba2d0c8900a9d1';
						var to_Addr = public_Key;
					console.log("to_address "+to_Addr);


						var settings = {
						    network: 'testnet',
						    privateSeed: privateSeed
						}

						var colu = new Colu(settings)
						colu.on('connect', function () {
						    //var toAddress = colu.hdwallet.getAddress();
						    var args = {
						        from: [to_Addr],
						        to: [{
						            address:from_addr ,
						            assetId: assetid,
						            amount: assetquantity
						        }/*,{
						            phoneNumber: phoneNumber,
						            assetId: assetId,
						            amount: 2
						        }*/]//,
						       /* metadata: {
						            'assetName': 'EQUITY FUND1',
						            'issuer': 'MANISH SAHNI',
						            'description': 'Equity Fund 1',
									'assetName': 'EQUITY FUND2',
						            'issuer': 'MANISH SAHNI',
						            'description': 'Equity Fund 2',
						           /* 'urls': [{name:'icon', url: 'https://pbs.twimg.com/profile_images/572390580823412736/uzfQSciL_bigger.png', mimeType: 'image/png', dataHash: ''}],
						            'userData': {
						                'meta' : [
						                    {key: 'Item ID', value: 2, type: 'Number'},
						                    {key: 'Item Name', value: 'Item Name', type: 'String'},
						                    {key: 'Company', value: 'My Company', type: 'String'},
						                    {key: 'Address', value: 'San Francisco, CA', type: 'String'}
						                ]
						            }*/
						        //}
						    }
							
						  colu.sendAsset(args, function (err, body) {

						        if (err) return console.error(err)
						        console.log("Body: ", body)
						    })
						})

						colu.init()

					});


});


	
	
	req.getConnection(function(err, connection) {
		console.log("asset id is "+assetid);
		if (err)
			throw err;
		connection
				.query(
						"INSERT INTO codeathon.transaction(User_ID, Asset_ID, Curr_NAV, Units,TXN_DATE, TXN_TYPE) VALUES ((SELECT ID FROM codeathon.user_info WHERE NAME = ?), (SELECT a.id FROM codeathon.asset_info a INNER JOIN codeathon.navupdater nav ON a.id = nav.asset_id INNER JOIN (SELECT asset_id,MAX(nav_date) dt FROM codeathon.navupdater GROUP BY asset_id) md ON nav.asset_id = md.asset_id AND md.dt = nav.nav_date WHERE  a.asset_id = ?),(SELECT MAX(NAV) FROM codeathon.navupdater nv INNER JOIN codeathon.asset_info a ON nv.asset_id = a.id), ?, CURRENT_TIMESTAMP, 'BUY')",
						
						[ username,  assetid ,assetquantity ],
						function(err, rows) {

							if (err)
								console.log("Error Selecting : %s ",
										err);
							
							console.log(rows);
							

						});



});
	
	
	
	
	
	

};