const URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_SI2hcK67etqWy9iac5RSPwvaPbHAtnQxKIoqHMyP";

let select=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fselect=document.querySelector(".from select");
let tselect=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for(let i of select){
    
    for (const currCode in countryList) {
        let option=document.createElement("option");
        option.value=currCode;
        option.innerText=currCode;
        if(i.name==="from" && currCode==="INR"){
            option.selected="selected";
        }
        else if(i.name==="to" && currCode==="USD"){
            option.selected="selected";
        }
        i.append(option);
    }

    // This event will help us to know in which select change is done (from/to)
    i.addEventListener("change",(eve)=>{
        flagupdate(eve.target);
    })
}


//This function is to update the flag iamges dynamically based on user selection
function flagupdate(element){
    let contry=element.value;       //IND
    let code=countryList[contry];   //IN
    let newsrc=`https://flagsapi.com/${code}/flat/64.png`;
    let flagimg=document.querySelector(`#flag-${element.name}`);
    console.log(element.name);
    flagimg.setAttribute("src",newsrc);
    
}

btn.addEventListener("click",(res)=>{
    event.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue==="" || amtValue<1 ){
        amtValue=1;
        amount.value=1;
    }
    (async function (){
        let response = await fetch(URL);
        let data = await response.json();

        let frate = data.data[fselect.value].value;
        let trate = data.data[tselect.value].value;
        console.log(frate,trate);
        
        let result = (amtValue * trate) / frate;
        console.log("new Amount=", result.toFixed(3)); // Round to 3 decimal places
        msg.innerText=`${amtValue}${fselect.value} = ${result.toFixed(3)}${tselect.value}`;

    })();
    
})
