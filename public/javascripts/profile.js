console.log("public.js script file running")
const likesBtn = document.querySelector('.likes')
const tagsBtn = document.querySelector('.tags')
const collectionsBtn = document.querySelector('.collections')
const petsBtn = document.querySelector('.pets')

const likesTable = document.querySelector('.petLikes')
const tagsTable = document.querySelector('.tagsTable')
const collectionsTable = document.querySelector('.collectionsTable')
const petsTable = document.querySelector('.petsTable')

likesBtn.addEventListener('click', (e) => {
    e.preventDefault()
    likesTable.style.display = 'flex'
    tagsTable.style.display = 'none'
    collectionsTable.style.display = 'none'
    petsTable.style.display = 'none'

})

tagsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    tagsTable.style.display = 'flex'
    likesTable.style.display = 'none'
    collectionsTable.style.display = 'none'
    petsTable.style.display = 'none'
})

collectionsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    collectionsTable.style.display = 'flex'
    likesTable.style.display = 'none'
    tagsTable.style.display = 'none'
    petsTable.style.display = 'none'
})

petsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    petsTable.style.display = 'none'
    likesTable.style.display = 'flex'
    tagsTable.style.display = 'none'
    collectionsTable.style.display = 'none'
})
