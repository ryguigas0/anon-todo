let todos = []

function getState() {

    const query = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    const stateQuery = query.state

    if (stateQuery) {
        const todosString = atob(stateQuery)

        const newTodos = JSON.parse(todosString)

        todos = newTodos
    }
}

getState()

async function mockTODOs() {
    if (todos.length == 0) {
        let reponse = await fetch("./mock.json")

        let mockTodos = await reponse.json()

        console.log({ mockTodos })

        todos = todos.concat([], mockTodos)
    }
}


async function renderTodos() {
    await mockTODOs()
    console.log({ rendering: todos })

    const emptyListPage = document.querySelector(".no-todo")
    const todoListPage = document.querySelector(".has-todo")
    if (todos.length == 0) {
        todoListPage.classList.add("invisible")
        emptyListPage.classList.remove("invisible")
        return
    }


    todoListPage.classList.remove("invisible")
    emptyListPage.classList.add("invisible")

    let newTodos = ``

    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];

        categoriesHTML = todo.categories.join(" ")

        newTodos += `
            <div class="todo">
                <h3>${todo.title}</h3>
                <p>
                    ${todo.descirption}
                </p>
                <p>
                    ${categoriesHTML}
                </p>
            </div>
        `
    }

    todoListPage.innerHTML += newTodos

}

renderTodos()


function saveTodos() {
    let todoTitle = document.querySelector("#todo-title").value
    let todoDescription = document.querySelector("#todo-description").value
    let todoCategories = []

    const newTodo = {
        title: todoTitle,
        descirption: todoDescription,
        categories: todoCategories
    }



    todos = [].concat([newTodo], todos)

    let stringifiedTodos = JSON.stringify(todos)
    let encodedTodos = btoa(stringifiedTodos)

    window.location = `./?state=${encodedTodos}`
}