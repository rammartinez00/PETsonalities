

const demoButton = document.getElementById('demo-btn')

demoButton.addEventListener('click', e => {
    const email = document.getElementById('emailInput');
    const password = document.getElementById('passwordInput');
    const loginForm = document.getElementById('loginForm');

    loginForm.style.visibility = 'hidden'
    email.value = 'demo@demo.demo'
    password.value = 'Demo123!'
})