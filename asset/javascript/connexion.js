document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();

    const storedEmail = "anicet@gmail.com";
    const storedPassword = "12345";

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const emptyInput = document.querySelector('.empty-input');
    const inavlidData = document.querySelector('.invalid-data');

    
})