// const db = require("../../db/models");

const delbtns = document.querySelectorAll(".deletebtn");
for (let i = 0; i < delbtns.length; i++) {
  const btn = delbtns[i];
  btn.addEventListener("click", async (e) => {
    const commentId = e.target.id.split("-")[2];
    const res = await fetch(`/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.message === "Success") {
      const commentbox = document.getElementById(`commentbox-${commentId}`);
      commentbox.remove();
    }

    // const comment = await db.Comment.findOne({
    //     where: {
    //     }
    // })
  });
}
