$( document ).ready(function() {
	console.log( "ready!" );

	//login page
	$('#open_signup').on('click', function(){
		 $('#signup_form').removeClass('hidden-xs').removeClass('hidden-sm');
		 $('#login_space').addClass('hidden-xs').addClass('hidden-sm');
	});
	$('.back_login').on('click', function(){
		 $('#signup_form').addClass('hidden-xs').addClass('hidden-sm');
		 $('#login_space').removeClass('hidden-xs').removeClass('hidden-sm');
	});
});

function loadMFHoldings()
{
	$.ajax(
			{url: "../js/samplejson.json",
			 success: function(result){
		     //$("#div1").html(result);
				 console.log("gandu");
				displayHolding(result);
    }});
}

function displayHolding(arr) {
    var out = "";
    var out_m = "";
    var i;
    //var obj = jQuery.parseJSON(arr);
    //JSON.parse(arr);
    console.log("ss");
    var obj =JSON.parse(JSON.stringify(arr));
    
    console.log(obj.assetData.length);
    for(i = 0; i < obj.assetData.length; i++) {
        out += '<tr><td>'+ (i+1) +'</td><td>' + obj.assetData[0].metadata.metadataOfIssuence.data.assetName + '</td><td> 108.3</td><td> 3000</td><td> chutia</td><td> 4000</td></tr>';
        out_m += '<thead><tr class="mob_head"><th class="table_sm_mfn"> M. F. Name</th><th class="table_sm_mfn"> ' + obj.assetData[0].metadata.metadataOfIssuence.data.assetName + '</th></tr></thead><tbody ><tr><th>Units Allocated</th> <td> 108.3</td></tr><tr><th>Amount Invested</th> <td> 3000</td></tr><tr><th>Current Nav</th> <td> 58</td></tr><tr><th>Total Market Value</th> <td> 4000</td></tr></tbody>';
       }
    console.log(obj.assetData[0].metadata.metadataOfIssuence.length);
    document.getElementById("MFHolding").innerHTML = out;
    document.getElementById("MFHolding_M").innerHTML = out_m;
}

function getBalance(){
	var val=0;
	$.ajax(
			{url: "http://coloredcoins.org/explorer/testnet/address/mk4fmKZSpP9rpDGrcBYAvnuVpcxsg8rkeT",
			 success: function(result){
		     $("#loadedPage").html(result);
				 console.log("changa");
			  val= document.getElementById("addressBalance"); 
			  console.log("val"+val);
			  document.getElementById("getBalance").innerHTML=val;
    }});
}

function purchaseMF(MFid,MFName,issuance_address){
	console.log(MFid);
	
		document.getElementById("MFId").value=MFid;
		document.getElementById("MFAmount").value=document.getElementById(MFid).value;
		document.getElementById("MFName").value=document.MFName;
		document.getElementById("issuance_address").value=issuance_address;
		document.getElementById("buymf").submit(); 
}
function sellMF(MFid,MFName,issuance_address){
	console.log(MFid);
		document.getElementById("MFId").value=MFid;
		document.getElementById("MFAmount").value=document.getElementById(MFid).value;
		document.getElementById("MFName").value=MFName;
		document.getElementById("issuance_address").value=issuance_address;
		document.getElementById("sellmf").submit(); 
}


function validate(){
	
	var ret = true;
	var val=document.getElementsByTagName("input");
	console.log(val);
	
	for(var i = 0; i<val.length; i++) {
		
		console.log(i);
		var str=val[i].value;
		var patt = /[a-z A-Z 0-9 ]/g;
		var res = patt.test(str);
		console.log("kunjal"+res);
		if(res == false && str != ""){
			val[i].style.color = "red";
			ret =false;
		}
		else
		{
			
		}
	}
	return ret;
}