   const colors = ["purple", "red", "rgba(0, 102, 199)", "#f15025"];
   const btn = document.getElementById("btn");
   const color= document.querySelector(".color");

   btn.addEventListener("click", function() {
    
    const randomNumber=  Math.floor(getRandomNumber());
    console.log(randomNumber);

    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];
}); 

function getRandomNumber(){
    return Math.random() * colors.length;
} 