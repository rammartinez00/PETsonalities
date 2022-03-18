
const likeButton = document.getElementById("like-button")
const petId = document.getElementById("petId").value
const likesValue = document.getElementById("likes-value")

let counter = 0; 

likeButton.addEventListener("click", async (e) =>{
    
  console.log(petId)
    const res = await fetch("/api/petLikes",
    {
        method: "POST",
        body: JSON.stringify({petId}),
        headers: {
            "Content-Type" : "application/json",
        },

    })

    

    const {petId, userId} = await res.json();
    //if(userId === )
    counter++
    likeButton.style.color = "red"
    likesValue.innerHTML = counter
    likesValue.innerHTML += userId

   


})

