// const db = require("../../db/models");

const delBtns = document.querySelectorAll(".deletebtn");
for (let i = 0; i < delBtns.length; i++) {
  const btn = delBtns[i];
  btn.addEventListener("click", async (e) => {
    const commentId = e.target.id.split("-")[2];
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.message === "Success") {
      const commentbox = document.getElementById(`commentbox-${commentId}`);
      commentbox.remove();
    }
  });
}

const editBtns = document.querySelectorAll(".editbtn");
for (let i = 0; i < editBtns.length; i++) {
  const btn = editBtns[i];
  btn.addEventListener("click", async (e) => {
    const commentId = e.target.id.split("-")[2];
    const form = document.getElementById(`edit-form-${commentId}`);
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
    } else {
      form.classList.add("hidden");
    }

    const submitBtn = document.getElementById(`edit-btn-${commentId}`);
    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const contentData = document.getElementById(
        `content-field-${commentId}`
      ).value;

      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify({ content: contentData }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.message === "Success") {
        const comment = document.getElementById(`post-content-${commentId}`);
        comment.innerHTML = data.comment.content;
        form.classList.add("hidden");
      }
    });
  });
}
