import React from "react";
import PropTypes from "prop-types";
import "./categories-view.css";

class CategoriesView extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    entries: PropTypes.array
  };

  render() {
    return <div>{this.props.entries}</div>;
  }
}

export default CategoriesView;
