var Colu = require('colu');

exports.sendAssets = function(err, result , assetID) {
	
console.log("asset id is "+assetID);

var privateSeed = 'd560c1c1d4a9179421b4d4f9b11a344222629f72a63239a7f6ba2d0c8900a9d1';
var assetId = 'U9q4NeFNpa1Jk1WcDPvcmFVGDc4rb8vwANbZJ';
var fromAddress = 'mk4fmKZSpP9rpDGrcBYAvnuVpcxsg8rkeT';


var phoneNumber = '+1234567890'

var settings = {
    network: 'testnet',
    privateSeed: privateSeed
}

var colu = new Colu(settings)
colu.on('connect', function () {
    //var toAddress = colu.hdwallet.getAddress();
    var args = {
        from: [fromAddress],
        to: [{
            address: 'n1ev6L3HV5fgz6PJnZuiSv1R96d7sgiuW6',
            assetId: assetId,
            amount: 1
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
}

