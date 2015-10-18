    
var Colu = require('colu')

exports.getAddress = function(err, result) {
	
	if(err) throw new err;

	var Colu = require('colu')
	var address;

	var settings = {
		network : 'testnet',
		privateSeed : 'd560c1c1d4a9179421b4d4f9b11a344222629f72a63239a7f6ba2d0c8900a9d1'
	}
	/*setTimeout(function() {
	    console.log('Blah blah blah blah extra-blah');
	}, 5000);
	*/
	var colu = new Colu(settings)
	/*colu.on('connect', function() {
		address = colu.hdwallet.getAddress()

		console.log("address: ", address)
	})*/

	address = colu.hdwallet.getAddress();
	
	colu.init()
	
	console.log("address is "+address);
	return address;
}