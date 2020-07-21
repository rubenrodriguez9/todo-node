const fs = require('fs')

const file = fs.readFileSync('./todos.csv', 'utf-8')

arr = file.split('\n')

const loadTodos = function(data){
    result =  []
    for(let i = 0;i < data.length; i++){
        result.push(data[i].split(','))
    }
    return result
}

let data = loadTodos(arr)

let displayTodos = function(data){
    for(let i = 0;i <data.length;i++){
        if(data[i][1] === 'complete'){
            console.log(data[i][0] + ' - ✅')
        }else if(data[i][1] === 'uncomplete'){
            console.log(data[i][0] + ' - X')
        }
    }
    
}

console.log(displayTodos(data))


const readline = require('readline')

const interface = readline.createInterface({input: process.stdin, output: process.stdout})

const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.

`

const handleMenu = function(answer){
    if(answer === '1'){
        interface.question('What task would you like to add?', add)
    }else if(answer === '2'){
        interface.question('What task would you like to remove?', remove)
    }else if(answer === '3'){
        interface.question('What task would you like to complete?', complete)
    }else if(answer === '4'){
        interface.question('What task would you like to complete?', uncomplete)
    }else if(answer === '5'){
        interface.close()
    }
    

}

interface.question(menu, handleMenu)


const add = function(string){
    let newArray =[string, 'uncomplete']
    
    data.push(newArray)
    console.log(data)
    saveTodos(data)
    interface.close()
}

const remove = function(string){
    for(let i = 0;i < data.length;i++){ 
        if(string === data[i][0]){
            data.splice(i,1)
            saveTodos(data)
            interface.close()
        }
    }
}

const complete = function(string){
        for(let i = 0;i < data.length;i++){
            if(string === data[i][0]){
                data.splice(i,1);
                data.push([string, 'complete']);
                saveTodos(data);
                interface.close();
            }
        }
}

const uncomplete = function(string){
    for(let i = 0;i < data.length;i++){
        if(string === data[i][0]){
            data.splice(i,1);
            data.push([string, 'uncomplete']);
            saveTodos(data);
            interface.close();
        }
    }
}

const saveTodos = function(data){
    let result = []
    // creates a new array

    for(let i = 0;i < data.length;i++){
        // loops through our data

        
        result.push(data[i].toString())
        // pushes each line to our new string


    }
    let lined = result.join("\n")
    console.log(lined)
    // joins each array and converts them to a lined string

    fs.writeFileSync('./todos.csv', lined)
    // changes our array to a csv file

}



