import React from "react";

class WelcomeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { op: 1 };
  }

  handleScroll = () => {
    if (window.scrollY > 100 && this.state.op == 0) {
      return;
    } else if (window.scrollY < 100) {
      this.setState({ op: 1 - window.scrollY / 100 });
    } else {
      this.setState({ op: 0 });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({ op: 1 });
  }

  render() {
    return (
      <div>
        <div style={{ opacity: this.state.op }}>
          <span>Ben Clark</span>
          <span>
            {`Welcome to my personal website,`}` <br />
            {`Here's a non-exausted list of things I&apos;ve done.`}
            <br />
          </span>
        </div>
      </div>
    );
  }
}

export default LilHeader;