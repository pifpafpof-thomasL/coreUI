import React from "react";

export default class LoadCapitals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/region/europe")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true
          });
          this.props.setCapitals(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  }
}
