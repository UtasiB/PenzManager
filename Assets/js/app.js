const serverURL = 'http://localhost:5000';

async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text();
}

function showMessage(msg){
    let alertBox = document.querySelector('#alertBox');
    alertBox.innerHTML = `<strong>HIBA!</strong> ${msg}`;
    alertBox.classList.remove('d-none');
}

render('login')