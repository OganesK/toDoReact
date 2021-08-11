const getData = async id => {
    const response = await fetch(`http://localhost:3001/getToDo?${id}`)
    const tasks = await response.text()
    console.log(tasks)
    return tasks
}

module.exports = getData;