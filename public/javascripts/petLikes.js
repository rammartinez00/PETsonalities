const likeButton = document.querySelectorAll(".like-button");
const petIds = document.querySelectorAll(".pet-id");

likeButton.forEach((button) => {
    button.addEventListener("click", async (e) => {
        const petLikeButton = e.target;
        const petId = parseInt(petLikeButton.getAttribute("petid"));
        const petLikeId = parseInt(petLikeButton.getAttribute("petlikeid"));
        const likesValues = document.querySelectorAll("#likes-value");

        if (!petLikeId) {
            //console.log('post')
            const res = await fetch("/api/petLikes", {
                method: "post",
                body: JSON.stringify({ petId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { sentPetLike, liked, likes } = await res.json();
            if (liked) {
                button.style.color = "red";
                petLikeButton.setAttribute("petlikeid", sentPetLike.id);
                if (likesValues) {
                    likesValues.forEach((likesValue, idx) => {
                        const petLikeButtonId = parseInt(petLikeButton.getAttribute("id"));

                        if (idx === petLikeButtonId) {
                            likesValue.innerHTML = likes;
                        }
                    });
                }
            }
        }

        if (petLikeId) {
            //console.log('delete')
            const res = await fetch(`/api/petLikes/${petLikeId}`, {
                method: "delete",
            });
            const { message, likes } = await res.json();
            if (message === "success") {
                petLikeButton.setAttribute("petlikeid", false);
                button.style.color = "white";
                if (likesValues) {

                    likesValues.forEach((likesValue, idx) => {
                        const petLikeButtonId = parseInt(petLikeButton.getAttribute("id"));

                        if (idx === petLikeButtonId) {
                            likesValue.innerHTML = likes;
                        }
                    });
                }
            }
        }
    });
});
