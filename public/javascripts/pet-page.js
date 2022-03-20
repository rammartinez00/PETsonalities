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
  btn.addEventListener("click", (e) => {
    const commentId = e.target.id.split("-")[2];
    const form = document.getElementById(`edit-form-${commentId}`);
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
    } else {
      form.classList.add("hidden");
    }

    const submitBtn = document.getElementById(`edit-btn-${commentId}`);
    submitBtn.addEventListener("click", async (subEvent) => {
      subEvent.preventDefault();
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
        const err1 = document.getElementById("errmsg");
        comment.innerHTML = data.comment.content;
        form.classList.add("hidden");
        err1.remove();
      } else {
        for (let i = 0; i < data.errs.length; i++) {
          let err = data.errs[i];
          const section = document.getElementById(`section-${commentId}`);
          const errormsg = document.createElement("p");
          errormsg.setAttribute("id", "errmsg");
          errormsg.innerHTML = err;
          errormsg.style.color = "red";
          section.appendChild(errormsg);
        }
      }
    });
  });
}
