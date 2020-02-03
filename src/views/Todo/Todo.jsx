//
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Label } from 'reactstrap';
import { Provider, create, connect } from 'mini-store';
 

  

export default class TodoApp extends Component {
    //export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.toggleTerminate = this.toggleTerminate.bind(this);
    }

    render() {
        return (
            <div>

                <Card>
                    <CardHeader>
                        C'est un pense bête Vacances
                    </CardHeader>
                    <CardBody>
                        <TodoList
                            items={this.state.items}
                            deleteRow={this.deleteRow}
                            toggleTerminate={this.toggleTerminate}
                        />
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <Label htmlFor="new-todo" style={{ margin: '5px' }}>
                                    Ou voulez-vous aller ?
                                </Label>
                                <input
                                    id="new-todo"
                                    className="mx-5"
                                    onChange={this.handleChange}
                                    value={this.state.text}
                                />
                                <Button>
                                    Ajouter #{this.state.items.length + 1}
                                </Button>
                            </form>
                            <Button className="mt-5 mx-auto" style={{ display: "block" }} onClick={() => this.handleClear()}>
                                Vider cette Liste
                            </Button>
                            <Counter/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    deleteRow(id) {
        console.log("deleteRow()", id)
        console.log("deleteRow(), this.state.items", this.state.items)
        this.setState(state => ({
            items: state.items.filter(e => e.id !== id),
        }));
    }

    toggleTerminate(id) {
        console.log("toggleTerminate()", id)
        const citems = this.state.items.map(e => { 
            if (e.id === id)
                e.toggleTerminate = !e.toggleTerminate
            return e;
        });
        this.setState(state => ({ items: citems }))
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleClear(e) {
        this.setState({ items: [] });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now(),
            toggleTerminate: false,
        };
        //const newItems = this.state.items;
        //newItems.push(newItem)
        this.setState(state => ({
            items: state.items.concat([newItem]),
            //items: newItems,
            text: ''
        }));
    }
};

class TodoList extends Component { //React.Component {
    deleteRow(id, e) {
        //console.log("id, e.target", id, e.target)
        this.props.deleteRow(id)
    }
    toggleTerminated(id, e) {
        console.log("id, e.target", id, e.target)
        this.props.toggleTerminate(id)

    }
    render() {
        return (
            <div>
                {this.props.items.map(item => (
                    <div key={item.id}>
                        <Button style={{ margin: '5px' }} onClick={(e) => this.deleteRow(item.id, e)}>
                            Delete Element
                        </Button>
                        <Label 
                            className="ml-5" 
                            onClick={(e) => this.toggleTerminated(item.id, e)}
                            style={{ textDecoration: item.toggleTerminate ? "line-through" : "" }}
                            >
                            {item.text}
                        </Label>
                    </div>
                ))}
            </div>
        );
    }
}
