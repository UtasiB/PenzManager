const ServerURL = "http://localhost:5000/"

async function render(view)
{
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text();
}

function alertBox(msg)
{
    let alertbox = document.querySelectorAll('#alertBox')
    alertbox.innerHTML = `<strong>HIBA!</strong> ${msg}`
    alertbox.classList.remove('d-none')
}
render('login')