const myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
});

document.addEventListener('DOMContentLoaded', (event) => {
    myModal.show();
});