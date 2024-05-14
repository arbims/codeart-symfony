import {h, Component} from 'preact'

export default class Todo extends Component {

    constructor (props) {
        super(props)
        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.state = {
            todos: [
                {id: 0, name: 'first todo', completed: true},
                {id: 1, name: 'second hi', completed: true},
                {id: 2, name: 'third hi', completed: true},
                {id: 3, name: 'ford hi', completed: true}
            ],
            nametodo: '',
            newTodo: {},
            id: 4
        }
    }

    increments () {
       this.setState({
           id: this.state.id + 1
       })
       return this.state.id
    }

    addTodo (e) {
        e.preventDefault()
        if(e.keyCode == 13){
            
            this.newtodo = {id: this.increments() , name: e.target.value, completed: false}
            this.setState({
                todos: this.state.todos.concat(this.newtodo)
            })
        }
     
    }

    removeTodo (e) {
        e.preventDefault()
        let id = parseInt(e.target.value)
        console.log(id)
        const filteredItems = this.state.todos.filter(item => {
            return item.id !== id
          })
          console.log(filteredItems)
          this.setState({
            todos: filteredItems,
          })
    }

    render (props, {todos, nametodo}) {
        return <div><div>Todo</div>
            <h1>Add Todo</h1>
            <input type="text" id="nametodo" value={nametodo} onKeyUp={this.addTodo} />
           {todos.map((todo,key) =>
                <div>{todo.name}<button onClick={this.removeTodo} value={todo.id}>X</button></div>
           )}
        </div>
    }
}