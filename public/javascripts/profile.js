console.log("public.js script file running");
const likesBtn = document.querySelector(".likes");
const collectionsBtn = document.querySelector(".collections");
const petsBtn = document.querySelector(".pets");
const commentsBtn = document.querySelector(".comments");

const likesTable = document.querySelector(".petLikes");
const collectionsTable = document.querySelector(".collectionsTable");
const petsTable = document.querySelector(".petsTable");
const commentsTable = document.querySelector(".commentsTable");

likesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  likesTable.style.display = "flex";
  collectionsTable.style.display = "none";
  petsTable.style.display = "none";
  commentsTable.style.display = "none";
});

collectionsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  collectionsTable.style.display = "flex";
  likesTable.style.display = "none";
  petsTable.style.display = "none";
  commentsTable.style.display = "none";
});

petsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  petsTable.style.display = "none";
  likesTable.style.display = "flex";
  collectionsTable.style.display = "none";
  commentsTable.style.display = "none";
});

commentsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  commentsTable.style.display = "flex";
  likesTable.style.display = "none";
  collectionsTable.style.display = "none";
  petsTable.style.display = "none";
});
