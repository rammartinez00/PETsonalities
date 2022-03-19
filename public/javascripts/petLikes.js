const likeButton = document.querySelectorAll(".like-button")
const petIds = document.querySelectorAll(".pet-id")

likeButton.forEach(button => {
    button.addEventListener("click", async (e) => {
        const petLikeButton = e.target
        const petId = parseInt(petLikeButton.getAttribute('petid'))
        const petLikeId = parseInt(petLikeButton.getAttribute('petlikeid'))
        const petLikePetId = parseInt(petLikeButton.getAttribute('petlikepetid'))
        const likeValue = document.getElementById('likes-value')
        let liked = petLikeButton.getAttribute('liked')

        if (!liked) {
            console.log('post')
            const res = await fetch("/api/petLikes", {
                method: "post",
                body: JSON.stringify({ petId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const { sentPetLike, confirmed, likes } = await res.json();
            if (confirmed) {
                button.style.color = 'red'
                petLikeButton.setAttribute('liked', true)
                petLikeButton.setAttribute('petlikepetid', sentPetLike.petId)
                petLikeButton.setAttribute('petlikeid', sentPetLike.id)
                // likeValue.innerHTML = likes
            }
        }


   


})

        if (liked && petLikePetId === petId) {
            console.log('delete')
            const res = await fetch(`/api/petLikes/${petLikeId}`, {
                method: 'delete'
            })
            const { message } = await res.json()
            if (message === 'success') {
                button.style.color = "white"
                petLikeButton.setAttribute('liked', false)
            }
        }
    })

