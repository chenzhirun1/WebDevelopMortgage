    //********************************************************************************//
    //* Name : Zhirun Chen                                                           *//
    //* Zenit login : int222_141c04                                                  *//
    //********************************************************************************//

function validationForPayment() {   

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, simply update the comments area with the message:     *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//

	var PVerror = false;
	var DPerror = false;
	var IRerror = false;
	var AMerror = false;
	
	PVerror = checkPropValue();
	DPerror = checkDownPay();
	IRerror = checkIntRate();
	AMerror = checkAmortization();
	
	if(PVerror || DPerror || IRerror || AMerror)
	{
		document.getElementById("comments").value = "<p>Please complete the form first and then click on Calculate Monthly Payment.</p>";
	}
	else
	{
		var mortAmount = document.getElementById("propValue").value;
		var mortDownPayment = document.getElementById("downPay").value;
		var mortRate = document.getElementById("intRate").value;
		var mortAmortization = document.getElementById("amortization").value;
		detailPaymentCalculation(mortAmount, mortDownPayment, mortRate, mortAmortization);
	}
	
} // End of validationForPayment function

    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         paymentError = "Please complete the form before attempting to calculate the monthly payment" 
         document.forms[0].comments.value = paymentError;
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
           document.forms[0].comments.value = "";
     }

} // End of detailPaymentCalculation function


function completeFormValidation() {

    //********************************************************************************//
    //*                                                                              *//
    //* This function calls the different functions to validate all required fields  *//
    //*                                                                              *//
    //* Once you have validated all field,                                           *//
    //* determine if any error(s) have been encountered                              *//
    //*                                                                              *//
    //* If any of the required fields are in error:                                  *//
    //*                                                                              *//
    //*    present the client with a list of all the errors in reserved area         *//
    //*         on the form and                                                      *//
    //*          don't submit the form to the CGI program in order to allow the      *//
    //*          client to correct the fields in error                               *//
    //*                                                                              *//
    //*    Error messages should be meaningful and reflect the exact error condition.*//
    //*                                                                              *//
    //*    Make sure to return false                                                 *//
    //*                                                                              *//
    //* Otherwise (if there are no errors)                                           *//
    //*                                                                              *//
    //*    Change the 1st. character in the field called client to upper case        *//
    //*                                                                              *//
    //*    Change the initial value in the field called jsActive from OFF to ON      *//
    //*                                                                              *//
    //*    When a browser submits a form to a CGI program, disabled fields           *//
    //*    like the payment field are not included. To insure that the payment field *//
    //*    is sent to the CGI, include the following JavaScript statement            *//
    //*    document.forms[0].payment.disabled = false;                               *//
    //*                                                                              *//
    //*    Make sure to return true in order for the form to be submitted to the CGI *//
    //*                                                                              *//
    //********************************************************************************//

	var error ="";
	
	error += checkUserId();
	error += checkClient();
	error += checkPropValue();
	error += checkDownPay();
	error += checkIncome();
	error += checkPropDetails();
	error += checkPropLocation();
	error += checkMortYear();
	error += checkMortMonth();
	error += checkIntRate();
	error += checkAmortization();
	
	if (error != "")
	{
		document.getElementById("reserverd").innerHTML = error;
		return false;
	}
	else
	{
		document.getElementById("client").value = document.getElementById("client").value.substr(0,1).toUpperCase();
		document.forms[0].payment.disabled = false;
		document.getElementById("jsActive")[0].value = "ON";
		return true;
	}
	
} // End of completeFormValidation

function checkUserId()
{
	var error = "";
	var UserId = document.getElementById("userId").value;
	
	if(UserId.length < 10)
	{
		error += "<p>User ID is must be 10 degits.</p>";
	}
	
	if(UserId.charAt(4) != '-')
	{
		error += "<p>Position 5 must be a hyphen (-).</p>";
	}
	
	for(var i=0; i<10; i++)
	{
		if(i == 4)
		{
			i++;
		}
		if (isNaN(UserId.charAt(i)))
		{
			error += "<p>Position "+(i+1)+" must be numeric digits</p>";
		}
	}
	
	if(error == "")
	{
		var leftNum = 0;
		var rightNum = 0;
		
		for (var i=0 ; i<4; i++)
		{
			leftNum += parseInt (UserId.charAt(i));
		}
		for (var i=5; i<10; i++)
		{
			rightNum += parseInt (UserId.charAt(i));
		}
		if ( leftNum == 0)
		{
			error += "<P>The First 4 digits must greater than zero.</p>";
		}
		if (rightNum == 0)
		{
			error += "<p>The Last 5 digits must greater than zero.</P>";
		}
		if ((rightNum - 1) != leftNum*2)
		{
			error += "<p>The sum of last 5 digits must be equal the sum of first 4 digits multiply by 2 plus 1</p>";
		}
	}
	return error;
}

function checkClient()
{
	var error = "";
	var client = document.getElementById("client").value;
	var apostrophe = false;
	var hyphen = false;
	
	if (client.length < 3)
	{
		error += "<p>Name Must have at least 3 characters.</p>";
	}
	else
	{
		for (var i = 0 ; i < client.length ; i++)
		{
			if ((client.charAt(i) >= 'A' && client.charAt(i) <= 'Z') || (client.charAt(i) >= 'a' && client.charAt(i) <='z') || (client.charAt(i) == '-') || (client.charAt(i) == "'"))
			{
				if((client.charAt(i) == '-') || (client.charAt(i) == "'"))
				{
					if(i < 3)
					{
						error += "<p>Must have at least 3 alphabetic characters (a-z) (A-Z) at the beginning of the field</p>";
					}
					if(i == client.length - 1 || i == 0)
					{
						error += "<p>an apostrophe (') or a hyphen (-) at the beginning or at the end of the name is not valid</p>";
					}
					if (client.charAt(i+1) == '-' || client.charAt(i+1) == "'")
					{
						error += "<p>Alphabetic and Hyphen can't be next to each other</p>";
					}
					if (apostrophe && client.charAt(i) == "'")
					{
						error += "<p>Only one apostrophe allowed in the name.</p>";
					}
					if (hyphen && client.charAt(i) == "-")
					{
						error += "<p>Only one hyphen allowed in the name.</p>";
					}
					if (client.charAt(i) == "-")
					{
						hyphen = true;
					}
					else if(client.charAt(i) == "'")
					{
						apostrophe = true;
					}
				}
			}
			else
			{
				error += "<p>Name only can be alphabetic charters or hyphen or apostrophe.</p>";
			}
		}
	return error;
	}
}
function checkPropValue()
{
	var error ="";
	var PropValue = document.getElementById("propValue").value;
	var DownPay = document.getElementById("downPay").value;
	
	if (PropValue == 0)
	{
		error += "<p>Property Value must be filled in.</p>";
	}
	if (PropValue<0)
	{
		error += "<p> Property Value must greater than 0.</p>";
	}
	if (isNaN(PropValue))
	{
		error += "<p> Property Value must be number only.</p>";
	}
	if(PropValue != parseInt(PropValue))
	{
		error += "<p> Property Value must be whole number</p>";
	}
	if (!((parseInt(PropValue) -65000)>=DownPay))
	{
		error += "<p>Must be at least 65,000 dollars more that the down payment.</p>";
	}
	return error;
}

function checkDownPay()
{
	var error ="";
	var PropValue = document.getElementById("propValue").value;
	var DownPay = document.getElementById("downPay").value;
	
	if (DownPay == 0)
	{
		error += "<p>Down Payment must be filled in.</p>";
	}
	if (isNaN(DownPay))
	{
		error += "<p>Down Payment must be a number.</p>";
	}
	if (DownPay <0)
	{
		error += "<p>Down Payment must be a positive number.</p>";
	}
	if (DownPay != parseInt(DownPay))
	{
		error += "<p>Down Payment must be a whole number</p>";
	}
	if ( DownPay < parseInt(PropValue) / 10)
	{
		error += "<p>Down Payment must be at lease 10% of property</p>";
	}
	return error;
}

function checkIncome()
{
	var error = "";
	var isSelected = document.getElementById("income").selectedIndex;
	
	if(isSelected == -1)
	{
		error += "<p>You must select one income range.</p>";
	}
	return error;
}

function checkBox(isChecked)
{
	var options = document.getElementsByName("propDetails");
	if(isChecked.value == "D7")
	{
		for(var i = 0; i < options.length; i++)
		{
			if(options[i].value != "D7")
			{
				options[i].checked = false;
			}
		}
	}
	else
	{
		for(var i = 0; i < options.length; i++)
		{
			if(options[i].value == "D7")
			{
				options[i].checked = false;
			}
		}
	}
}

function checkPropDetails()
{
	var error = "";
	var isChecked = false;
	var options = document.getElementsByName("propDetails");
	for(var i = 0; i < options.length; i++)
	{
        if(options[i].checked==true)
		{
         	isChecked = true;
		}   
    }

	if(!isChecked)
	{
		error += "<p>You must check at least 1 Property</p>";
	}
	return error;
}

function checkPropLocation()
{
	var error = "";
	var isChecked = false;
	var lSelected = document.getElementsByName("propLocation");
	
	for( var i = 0; i < lSelected.length; i++)
	{
		if( lSelected[i].checked)
		{
			isChecked = true;
		}
	}
	if (!isChecked)
	{
		error += "<p>You must select one location</p>";
	}
	return error;
}

function checkMortYear()
{
	var error = "";
	var myDate = new Date();
	var currYear = myDate.getFullYear();
	var year = document.getElementById("mortYear").value;
	
	if(!year)
	{
		error += "<p>Please Enter a year</p>";
	}
	if (isNaN(year))
	{
		error += "<p>Please Enter a number of year.</p>";
	}
	if(!(parseInt(year) == parseInt(currYear) || parseInt(year) == parseInt(currYear+1)))
	{
		error += "<p>Please Enter a year only be current year or next year.</p>";
	}
	return error;
}

function checkMortMonth()
{
	var error = "";
	var myDate = new Date();
	var currMonth = myDate.getMonth();
	var Month = document.getElementById("mortMonth").value;
	
	if(!Month)
	{
		error += "<p>Please Enter a Month</p>";
	}
	if (isNaN(Month))
	{
		error += "<p>Please Enter a Number of Month</p>";
	}
	if (parseInt(Month) < 1 || parseInt(Month) > 12)
	{
		error += "<p>Please Enter a Number between 1 to 12</p>";
	}
	if (!(parseInt(Month) == parseInt(currMonth) || parseInt(Month) == parseInt(currMonth + 1)))
	{
		error += "<p>Month must be equal to the current month or 1 month greater than current month.</P>";
	}
	return error;
}

function checkIntRate()
{
	var error = "";
	var rate = document.getElementById("intRate").value;
	
	if (!rate)
	{
		error += "<p>Please Enter the Interest Rate.</p>";
	}
	if(isNaN(rate))
	{
		error += "<p>Rate Must be a number</p>";
	}
	if(2 > parseInt(rate) || 11 < parseInt(rate))
	{
		error += "<p>Rate Must between 2 to 11</p>";
	}
	return error;
}

function checkAmortization()
{
	var error = "";
	var amort = document.getElementById("amortization").value;
	
	if(!amort)
	{
		error += "<p>Please Enter No. of Years</p>";
	}
	if(isNaN(amort))
	{
		error += "<p>Please Enter a Number for No. of year</P>";
	}
	if(parseInt(amort) < 5 || parseInt(amort) > 20)
	{
		error += "<p>Please Enter a number between 5 to 11</p>";
	}
	return error;
}











