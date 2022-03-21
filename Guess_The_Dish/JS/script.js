const btn = document.querySelector(".left .btn");
const writeUp1 = document.querySelector(".content");
const writeUp2 = document.querySelector(".Gdescription");
const animation = document.querySelector(".container");
const img = document.querySelector(".left");
const foodImg = document.querySelector(".foodImg");
const btnG = foodImg.querySelector(".btnG");
const checkBtn = foodImg.querySelector("#checkAns");
const API = "https://foodish-api.herokuapp.com/api/";
const ans = foodImg.querySelector(".ans");
let inputTags = document.querySelectorAll(".unknown");
const vowels = "aeiou";
let foodName = "", ansArr = [], arrayMembers = [];
let index=0;
let userConst = "", quesConst = "", counter=0;
let error = 0, corIndex=0;

newLevel = () =>
{
    if (counter===1)
    {
        btnG.setAttribute("disabled", "true");
    }
}

inputMaker = () =>
{
    ansArr = foodName.split("");
    analyser(ansArr);
}

wordsAdder = (k) =>
{
    if (error!==0)
    {
        let userChar = document.getElementById(k).value;
        if (document.getElementById(k).getAttribute("constPresent")===userChar)
        {
            writeUp2.querySelector("h3").innerText="Correct! Keep Going";
            writeUp2.querySelector("h2").innerText="";
            corIndex++;
            if (corIndex===quesConst.length)
            {
                counter=0;
                //****************************************** */
                // NEED TO ALSO ADD AN EVENT SHOWING CORRECT
                alert("New Word");
                // document.remove(inputTags);
                ans.innerHTML="";
                quesConst="";
                foodName="";
                corIndex=0;
                // btnG.removeAttribute("disabled");
                // foodImg.querySelector(".btnG").classList.remove("next");
                // foodImg.querySelector("#checkAns").classList.remove("check");
                // foodImg.querySelector(".btnG").innerText = "Next";
                getNext();
            }
        }
        else if (document.getElementById(k).getAttribute("constPresent")!==userChar)
        {
            error--;
            alert("false");
            writeUp2.querySelector("h3").innerText="Wrong, Try Again.";
            writeUp2.querySelector("h2").innerText="";
            clearInp(k);
        }
        else
        {
            alert(`You have ${error} chances left.`);
        }
        
    }
    else
    {
        alert("Game Over");
        clearInp(k);
    }
}
clearInp = (k) =>
{
    document.getElementById(k).value = "";
}
clearInpAll = () =>
{
    ans.querySelectorAll("input").forEach(inp => inp.value = "");
}
analyser = (ansArr) =>
{
    for (let i=0; i<ansArr.length; i++)
    {
        if (!vowels.includes(ansArr[i]))
        {
            // makes an array of consonants
            quesConst += ansArr[i];
            let tagText = `<input maxlength="1" class = "unknown ${i}" id="${i}" constPresent= "${ansArr[i]}" oninput="wordsAdder(this.id)">`;
            ans.innerHTML+= tagText;
            // arrayMembers[i] = document.querySelector(".ans");
            // let tagText = "<in"
            
            
            // arrayMembers[i] = document.createElement("input");
            // arrayMembers[i].setAttribute("maxlength", "1");
            // arrayMembers[i].classList.add("unknown");
            // arrayMembers[i].classList.add(i);
            // arrayMembers[i].setAttribute("id", i);
            // arrayMembers[i].setAttribute("constPresent", ansArr[i]);
            // arrayMembers[i].setAttribute("oninput","wordsAdder(this.id)");
            // // foodImg.querySelector(".ans").appendChild(arrayMembers[i]);
            // ans.appendChild(arrayMembers[i]);
        }
        else
        {
            arrayMembers[i] = document.createElement("div");
            arrayMembers[i].classList.add("known");
            arrayMembers[i].innerText = ansArr[i];
            foodImg.querySelector(".ans").appendChild(arrayMembers[i]);
        }
    }
    error= quesConst.length-1;
}

// for the writeUps
startG = () =>
{
    writeUp1.classList.add("oldWriteUp");
    writeUp2.classList.add("visibleG");
    img.classList.add("noImg");
    foodImg.classList.add("gameOn");
}

// fetching images link from api
imgGiver = ()=>
{
    return fetch(API)
    .then(response => response.json())
    .then(data => data.image)
    // .catch(alert("Check your internet connection and try again."))
}
async function getNext ()
{
    counter++;
    // only for the first key to stop putting a lot of words.
    newLevel();
    const APIimg = await imgGiver()
    const arr = APIimg.split(""); 
    for (let i=41; i<arr.length; i++)
    {
        if (arr[i]==="/")
        {
            break;
        }
        else
        {
            foodName += arr[i];
        }
    }
    foodImg.querySelector(".btnG").classList.add("next");
    foodImg.querySelector(".ques").setAttribute("src", APIimg);
    inputMaker();
}




