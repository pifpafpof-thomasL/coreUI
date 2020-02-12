//
import React, { Component } from "react";
import {
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
  Label,
  CardDeck
} from "reactstrap";

import GotoList from './GotoList'
import LoadCapitals from './LoadCapitals'
import DayWeather from './DayWeatherHooks'
import CountButton from './CountButton'

import ComponentA from './ComponentA'
import ComponentB from './ComponentB'

// import ReactWeather from 'react-open-weather';   // does not work, react dependencies issue
// import 'react-open-weather/lib/css/ReactWeather.css';


export default class GotoApp extends Component {
  //export default class GotoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoItems: [],
      selectItems: [],
      text: "",   // text displayed on input zone
      selectedItem: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.toggleTerminate = this.toggleTerminate.bind(this);
    this.setCapitals = this.setCapitals.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  renderSelectDropDown() {
    const { selectItems } = this.state;

    return (
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
            <option key={item.id}>{item.text}</option>
          ))}
        </Input>
      </FormGroup>
    )
  }

  renderForms() {
    const { text, selectedItem } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="new-Goto" style={{ margin: "5px" }}>
            Ou voulez-vous aller ?
        </Label>
          <input
            id="new-Goto"
            className="mx-5"
            onChange={this.handleChange}
            value={text}
          />
          <Button>Ajouter #{this.state.gotoItems.length + 1}</Button>
        </form>
        <Button
          className="mt-5 mx-auto"
          style={{ display: "block" }}
          onClick={() => this.handleClear()}
        >
          Vider cette Liste
      </Button>
        {this.renderSelectDropDown()}
        {selectedItem !== "" && (<DayWeather city={selectedItem} />)}
      </div>
    )
  }

  render() {
    const { gotoItems } = this.state;
    return (
      <div>
        <Card>
          <CardHeader>C'est un pense bête Vacances</CardHeader>
          <CardBody>
            <LoadCapitals setCapitals={this.setCapitals} />
            <GotoList
              gotoItems={gotoItems}
              deleteRow={this.deleteRow}
              toggleTerminate={this.toggleTerminate}
            />
            {this.renderForms()}
            <Card className="mt-5">
              <CardBody>
                <CountButton />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <ComponentA />
                <ComponentB />
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  }

  handleSelectChange(event) {
    event.preventDefault();
    const text = event.target.value;
    const newItem = {
      text,
      id: Date.now(),
      toggleTerminate: false
    };
    this.setState(state => ({
      gotoItems: state.gotoItems.concat([newItem]),
      selectedItem: text
    }));
  }

  setCapitals(capitals) {
    const selectItems = capitals.map((c, index) => ({
      text: c.capital,
      id: index,
      toggleTerminate: false
    }));
    this.setState({ selectItems });
  }

  deleteRow(id) {
    console.log("deleteRow(), id, this.state.gotoItems", id, this.state.gotoItems);
    this.setState(state => ({
      gotoItems: state.gotoItems.filter(e => e.id !== id)
    }));
  }

  toggleTerminate(id) {
    console.log("toggleTerminate()", id);
    const citems = this.state.gotoItems.map(e => {
      if (e.id === id) e.toggleTerminate = !e.toggleTerminate;
      return e;
    });
    this.setState(state => ({ gotoItems: citems }));
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
      toggleTerminate: false
    };
    //const newItems = this.state.gotoItems;
    this.setState(state => ({
      gotoItems: state.gotoItems.concat([newItem]),
      //gotoItems: newItems,
      text: ""
    }));
  }
}



