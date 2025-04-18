let continue1 = document.querySelector('.continue1');
let signup = document.querySelector('.signup');
let code = document.querySelector('.code');
let continue2 = document.querySelector('.continue2');
let location1 = document.querySelector('.location1');
let continueAccount = document.querySelector('.continueAccount');



continue1.addEventListener('click', function(){
    if(signup.style.left = '50%'){
        signup.style.left = '-130%';
        signup.style.display = 'none';
        code.style.left = '50%';
    }
})


    continue2.addEventListener('click', function(){
    if(code.style.left = '50%'){
        code.style.left = '-140%';
        location1.style.left = '50%'
    }
})



 continueAccount.addEventListener('click', function(){
    if(location1.style.left = '50%'){
        location1.style.left = '-150';
    }
 })




