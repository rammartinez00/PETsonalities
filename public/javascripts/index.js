
window.addEventListener("DOMContentLoaded", (event)=>{
    let likesValue = 0;

    const likes = document.getElementById("likes-value")
    likes.innerHTML = likesValue

    document
        .getElementById("like-button")
        .addEventListener("click", event => {
            likesValue += 1
            likes.innerHTML = likesValue;
        })


})






