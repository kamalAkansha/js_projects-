let count=0;
const count1 =  document.querySelector('#count1');

const decrease = document.getElementsByClassName('decrease')[0];
const reset = document.getElementsByClassName('reset')[0];
const increase = document.getElementsByClassName('increase')[0];

console.log(decrease);
console.log(reset);
console.log(increase);

decrease.addEventListener('click', ()=>{
    count--;
    count1.textContent = count;
    count1.style.color= "red";
});

reset.addEventListener('click', ()=>{
    count=0;
    count1.textContent = count;
    count1.style.color= "#222";
});

increase.addEventListener('click', ()=>{
    count++;
    count1.textContent = count;
    count1.style.color= "green";
});
