import React from "react";

class HTMLWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateHTML = event => {
    this.props.handleChange(event);
    const target = event.target;
    const value = target.value;
    console.log(this.state.preview);
    document.getElementById("html-preview").innerHTML = value;
    // Send it up to the parent for storage...
    // this.setState({ currentEntry: newEntry });
    console.log();
  };

  componentDidMount() {
    this.setState({
      preview: "nothing yet!"
    });
  }

  render() {
    return (
      <div id="html-editor">
        <div id="html-left-pane">
          <label htmlFor="html">Content Editor</label>
          <textarea
            id="html-text-input"
            name="html"
            type="textarea"
            onChange={this.updateHTML}
          />
        </div>
        <div id="html-right-pane">
          <span id="html-preview" />
        </div>
        <div id="clearfix" style={{ clear: "both", width: "100%" }}>
          {" "}
        </div>
      </div>
    );
  }
}

export default HTMLWriter;
