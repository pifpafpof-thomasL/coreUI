//
import React, { Component } from 'react';
import { FormGroup, Input, Card, CardHeader, CardBody, Button, Label } from 'reactstrap';


export default class TodoApp extends Component {
    //export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotoItems: [],
            selectItems: [],
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.toggleTerminate = this.toggleTerminate.bind(this);
        this.setCapitals = this.setCapitals.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    render() {
        const { selectItems, gotoItems, text } = this.state;
        return (
            <div>
                <Card>
                    <CardHeader>
                        C'est un pense bête Vacances
                    </CardHeader>
                    <CardBody>
                        <LoadCapitals setCapitals={this.setCapitals} />
                        <TodoList
                            gotoItems={gotoItems}
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
                                    value={text}
                                />
                                <Button>
                                    Ajouter #{this.state.gotoItems.length + 1}
                                </Button>
                            </form>
                            <Button className="mt-5 mx-auto" style={{ display: "block" }} onClick={() => this.handleClear()}>
                                Vider cette Liste
                            </Button>
                            <FormGroup>
                                <Label for="exampleSelect">Capitals list</Label>
                                <Input
                                    type="select" 
                                    name="select" 
                                    id="exampleSelect"
                                    onChange={this.handleSelectChange}
                                    >
                                    <option>Choose a capital...</option>
                                    {selectItems.map(item => (
                                        <option key={item.id}>
                                            {item.text}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    handleSelectChange(event) {
        event.preventDefault();
        const newItem = {
            text:event.target.value,
            id: Date.now(),
            toggleTerminate: false,
        };
        this.setState(state => ({
            gotoItems: state.gotoItems.concat([newItem]),
        }));
      }

    setCapitals(capitals) {
        const selectItems = capitals.map((c, index) => ({
            text: c.capital,
            id: index,
            toggleTerminate: false,
        }))
        this.setState({ selectItems });
    }

    deleteRow(id) {
        console.log("deleteRow()", id)
        console.log("deleteRow(), this.state.gotoItems", this.state.gotoItems)
        this.setState(state => ({
            gotoItems: state.gotoItems.filter(e => e.id !== id),
        }));
    }

    toggleTerminate(id) {
        console.log("toggleTerminate()", id)
        const citems = this.state.gotoItems.map(e => {
            if (e.id === id)
                e.toggleTerminate = !e.toggleTerminate
            return e;
        });
        this.setState(state => ({ gotoItems: citems }))
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleClear(e) {
        this.setState({ gotoItems: [] });
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
        //const newItems = this.state.gotoItems;
        this.setState(state => ({
            gotoItems: state.gotoItems.concat([newItem]),
            //gotoItems: newItems,
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
                {this.props.gotoItems.map(item => (
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




class LoadCapitals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/region/europe")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });
                    this.props.setCapitals(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else { return null }
    }
}

