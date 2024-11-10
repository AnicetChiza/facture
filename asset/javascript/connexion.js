document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();

    const storedEmail = "anicet@gmail.com";
    const storedPassword = "12345";

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const emptyInput = document.querySelector('.empty-input');
    const inavlidData = document.querySelector('.invalid-data');

    emptyInput.style.display = 'none';
    inavlidData.style.display = 'none';

    if (email === '' || password === ''){
        emptyInput.style.display = 'block';
    }

    else if(email != storedEmail || password != storedPassword){
        inavlidData.style.display = 'block';
    }

    else{
        window.location.href = 'facture.html';
    }
});