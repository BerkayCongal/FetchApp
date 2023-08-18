const postContainer = document.querySelector(".container");
const dialog = document.querySelector(".dialog");

const getData = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => renderPosts(json));
};

getData();

dialog.addEventListener("click", () => {
  
});

function removeItems(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

const renderPosts = (datas) => {
  datas.forEach((data) => {
    console.log(data);

    const divEl = document.createElement("div");
    const spanEl = document.createElement("span");
    const commets = document.createElement("button");
    const commentsContainer = document.createElement("div");

    divEl.classList.add("containerdiv");
    commentsContainer.classList.add(".commetUser");
    commets.classList.add("buttonComments");

    commets.addEventListener("click", () => {
      dialog.showModal();
      console.log(commets);
      removeItems(dialog);
      fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${data.id}`)
        .then((response) => response.json())
        .then((comments) => {
          comments.forEach((comment) => {
            const spancomments = document.createElement("span");
            spancomments.classList.add("span-comment");
            spancomments.innerText = `
            Explanation: ${comment.name}
            Email : ${comment.email}
            Comment: ${comment.name}
            `
            dialog.appendChild(spancomments);
          });

          fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
            .then((response) => response.json())
            .then((result) => {
              const spanuser = document.createElement("span");
              spanuser.classList.add("span-user");
              spanuser.innerText = `
              Name: ${result.name}
              Username: ${result.username}
              Phone:${result.phone}
              Email:${result.email}
              `;
              dialog.appendChild(spanuser);
            });
        });
        dialog.showModal();
    });

    
    commets.innerText = "";
    divEl.innerText = `${data.id}- Title : ${data.title}`;
    divEl.appendChild(commentsContainer);
    divEl.appendChild(commets);
    postContainer.appendChild(divEl);
  });
};
