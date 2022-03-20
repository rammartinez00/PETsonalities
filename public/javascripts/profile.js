
const likesBtn = document.querySelector(".likes");
const petsBtn = document.querySelector(".pets");
const commentsBtn = document.querySelector(".comments");
const likesTable = document.querySelector(".petLikes");
const petsTable = document.querySelector(".petsTable");
const commentsTable = document.querySelector(".commentsTable");

likesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  likesTable.style.display = "flex";
  petsTable.style.display = "none";
  commentsTable.style.display = "none";
});

petsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  petsTable.style.display = "flex";
  likesTable.style.display = "none";
  commentsTable.style.display = "none";
});

commentsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  commentsTable.style.display = "flex";
  likesTable.style.display = "none";
  petsTable.style.display = "none";
});
