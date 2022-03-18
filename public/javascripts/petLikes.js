
const likeButton = document.getElementById("like-button")
const petId = document.getElementById("pet-id").value
const likesValue = document.getElementById("likes-value")
const petLike = document.getElementById('pet-like-id')


likeButton.addEventListener("click", async (e) => {
    const res = await fetch("/api/petLikes", {
        method: "post",
        body: JSON.stringify({ petId }),
        headers: {
            "Content-Type": "application/json",
        },

    })

    const { petLikeId, liked, likes } = await res.json();
    if (liked) {
        const res = await fetch(`/api/petLikes/${petLike.value}`, {
            method: 'delete'
        })
        const { message } = await res.json()
        if (message === 'success') {
            likeButton.style.color = "white"
        }
    } else {
        petLike.value = petLikeId
        likeButton.style.color = 'red'
        likesValue.innerHTML = likes
    }

   


})

