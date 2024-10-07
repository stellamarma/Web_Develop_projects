var randomNumber1=Math.random() * 6;
randomNumber1=Math.floor(randomNumber1);

document.querySelector(".img1").setAttribute("src", `./images/dice${randomNumber1+1}.png`);

var randomNumber2=Math.random() * 6;
randomNumber2=Math.floor(randomNumber2);

document.querySelector(".img2").setAttribute("src", `./images/dice${randomNumber2+1}.png`);

if(randomNumber2>randomNumber1){

    document.querySelector(".container h1").textContent = "Player 2 is the winner!";

}else if(randomNumber2===randomNumber1){
    document.querySelector(".container h1").textContent = "Try Again...";
}else{
    document.querySelector(".container h1").textContent = "Player 1 is the winner!";

}