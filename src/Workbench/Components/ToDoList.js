import React, {Component} from 'react';

class ToDoList extends Component {
    constructor(props) {
        super(props);

        this.state = {ToDos: [], text: ''};
        this.HandleChange = this.HandleChange.bind(this);
        this.HandleNewToDo = this.HandleNewToDo.bind(this);
    }

    HandleChange(e) {
        this.setState({text: e.target.value});
    }

    HandleNewToDo(e) {
        e.preventDefault();

        if (!this.state.text.length)
            return;

        const NewToDo = {
            text: this.state.text,
            id: Date.now()
        };

        this.setState({ToDos: this.state.ToDos.concat(NewToDo), text: ''});
    }

    HandleRemoveToDo(e) {
        delete e.target.remove();
    }

    render() {
        return (
            <div className="ToDoList">
                <h1>Your To Do List!</h1>
                <ul>
                    {this.state.ToDos.map(ToDo => (
                        <li key={ToDo.id} onDoubleClick={this.HandleRemoveToDo}>{ToDo.text}</li>
                    ))}
                </ul>
                <form onSubmit={this.HandleNewToDo}>
                    <input id="NewToDo" onChange={this.HandleChange} value={this.state.text}/>
                    <button>Add a New To Do</button>
                </form>
            </div>
        );
    }
}

export default ToDoList;