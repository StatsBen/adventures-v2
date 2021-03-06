import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import Editor from "./editor/Editor";
import { auth, signInWithGoogle, signOut } from "../authentication/firebase";
import { whitelist } from "../authentication/whitelist";

class AdminPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentEntry: null, entries: null, user: null };
  }

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>
      this.setState({ user })
    );
  };

  login = () => {
    signInWithGoogle();
  };

  logout = () => {
    signOut();
  };

  render() {
    const { user } = this.state;
    return (
      <div id="admin-portal">
        {user && whitelist.includes(user.email) ? (
          <div id="admin-page">
            <Logout logout={this.logout} />
            <Editor />
            <div style={{ float: "none", clear: "both", width: "100%" }} />
          </div>
        ) : (
          <Login login={this.login} />
        )}
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default AdminPortal;
