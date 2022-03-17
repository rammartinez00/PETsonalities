
const likeButton = document.getElementById("like-button")
// const petId = document.getElementById("petId").value
const likesValue = document.getElementById("likes-value")



likeButton.addEventListener("click", async (e) =>{
    let petId = document.getElementById("petId").value

  //console.log(petId)
    const res = await fetch("/api/petLikes", {
        method: "POST",
        body: JSON.stringify(petId),
        headers: {
            "Content-Type" : "application/json",
        },

    })

    const {petId: petIdServer, userId} = await res.json();
    likeButton.style.color = "red"
    likesValue.innerHTML = petIdServer
    likesValue.innerHTML += userId


})