
const likeButton = document.getElementById("like-button")
const petId = document.getElementById("petId").value
const likesValue = document.getElementById("likes-value")



likeButton.addEventListener("click", async (e) => {
    const res = await fetch("/api/petLikes", {
        method: "post",
        body: JSON.stringify({ petId }),
        headers: {
            "Content-Type": "application/json",
        },

    })

    const { likes } = await res.json();
    likeButton.style.color = "red"
    likesValue.innerHTML = likes
    // likesValue.innerHTML += data.userId


})