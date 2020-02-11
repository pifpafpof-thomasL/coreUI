
import React, { Component } from "react";
import {
  Button,
  Label
} from "reactstrap";


export default class GotoList extends Component {
  deleteRow(id, e) {
    //console.log("id, e.target", id, e.target)
    this.props.deleteRow(id);
  }
  toggleTerminated(id, e) {
    console.log("id, e.target", id, e.target);
    this.props.toggleTerminate(id);
  }
  render() {
    return (
      <div>
        {this.props.gotoItems.map(item => (
          <div key={item.id}>
            <Button
              style={{ margin: "5px" }}
              onClick={e => this.deleteRow(item.id, e)}
            >
              Delete Element
            </Button>
            <Label
              className="ml-5"
              onClick={e => this.toggleTerminated(item.id, e)}
              style={{
                textDecoration: item.toggleTerminate ? "line-through" : ""
              }}
            >
              {item.text}
            </Label>
          </div>
        ))}
      </div>
    );
  }
}

 