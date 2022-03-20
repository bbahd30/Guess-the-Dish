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

const vowels = "aeiou";
let foodName = "", ansArr = [], arrayMembers = [];
let index=0;
let userConst = "", quesConst = "", counter=0;

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
    window.addEventListener('keydown', 
    (event)=>
    {
        if (event.key==="Backspace")
        {
            userConst = userConst.substring(0, userConst.length-2);
            console.log(userConst);
        }
    });
    userConst += document.getElementById(k).value;
    console.log(userConst);
    foodImg.querySelector("#checkAns").classList.add("check");
}
checker = () =>
{
    console.log(quesConst+" and "+userConst);
    // if correct
    if (quesConst===userConst)
    {
        // right
        console.log("correct");
        counter=0;
        btnG.setAttribute("disabled", "false");
        foodImg.querySelector(".btnG").classList.remove("next");
        foodImg.querySelector("#checkAns").classList.remove("check");
        foodImg.querySelector(".btnG").innerText = "Next";
        // let parent = document.getElementsByClassName(".ans");
        // let child = document.querySelectorAll(".unknown");
        // parent.removeChild(child);
        // ans.removeChild(document.getElementsByClassName(".unknown"));
    }
    else
    {
        console.log("Try Again");
        clearInp();
        userConst="";
    }
}



clearInp = () =>
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
            arrayMembers[i] = document.createElement("input");
            arrayMembers[i].setAttribute("maxlength", "1");
            arrayMembers[i].classList.add("unknown");
            arrayMembers[i].setAttribute("id", i);
            arrayMembers[i].setAttribute("oninput","wordsAdder(this.id)");
            foodImg.querySelector(".ans").appendChild(arrayMembers[i]);
        }
        else
        {
            arrayMembers[i] = document.createElement("div");
            arrayMembers[i].classList.add("known");
            arrayMembers[i].innerText = ansArr[i];
            foodImg.querySelector(".ans").appendChild(arrayMembers[i]);
        }
    }
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




