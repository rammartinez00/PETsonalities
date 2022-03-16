console.log('create-pet');

const selectedElement = document.getElementById('select-pet-type');
const options = document.querySelectorAll('#select-pet-type > option');
const createBtn = document.getElementById('createBtn');


const cookieArr = document.cookie.split(';');
const petTypeCookie = cookieArr.find(c => c.includes('pet'));

let petTypeCookieVal;
if (petTypeCookie) {
    petTypeCookieVal = petTypeCookie.split('=')[1]
}

const clickedCookie = cookieArr.find(c => c.includes('clicked'));

if (!clickedCookie) {
    document.cookie = "petType=''; max-age=0"
}

if (clickedCookie) {
    options.forEach(option => {
        if (option.value === petTypeCookieVal) {
            console.log('persists')
            option.setAttribute('selected', true)
        }
    })
}

document.cookie = "clicked=''; max-age=0";

selectedElement.addEventListener('change', () => {
    document.cookie = `petType=${selectedElement.value}`;
})

createBtn.addEventListener('click', () => {
    document.cookie = 'clicked=true'
})

let selectedOption;
selectedElement.addEventListener('change', () => {
    selectedOption = e.target.value;
})

options.forEach(option => {
    if (option.value === selectedOption) {
        option.setAttribute('selected', true)
    }
})