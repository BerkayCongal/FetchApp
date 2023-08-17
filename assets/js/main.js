 const postContainer = document.querySelector(".container")

const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => renderPosts(json))
}


getData();



function removeİtems(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild)
        }
}

const renderPosts = (datas) =>  {
    datas.forEach(data => {
        console.log(data)


        const divEl = document.createElement("div");
        const buttonEl = document.createElement("button");
        const spanEl = document.createElement("span");
        const commets = document.createElement("button")
        const commentsContainer = document.createElement("div")
       

        divEl.classList.add("containerdiv")
        commentsContainer.classList.add(".commetUser")
        buttonEl.classList.add("buttonUser")
        commets.classList.add("buttonComments")
        
    
        buttonEl.addEventListener("click", () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
            .then(response => response.json())
            .then(result => {
                
                spanEl.innerText = result.name;
                divEl.appendChild(spanEl)
            })
        })

        commets.addEventListener("click", () => {

            removeİtems(commentsContainer)
            fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${data.id}`)
            .then(response => response.json())
            .then(comments => { 

                comments.forEach(comment => {
                    const spancomments = document.createElement("span")
                    spancomments.classList.add("span-comment")
                    spancomments.innerText = comment.name
                    commentsContainer.appendChild(spancomments);
                }) 
            })
        })

        commets.innerText = "Comments In"
        buttonEl.innerText = "User In"

        divEl.innerText = `${data.id} ${data.title}`;
        divEl.appendChild(commentsContainer)
        divEl.appendChild(commets)
        divEl.appendChild(buttonEl)
        postContainer.appendChild(divEl)
    });
}