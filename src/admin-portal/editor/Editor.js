import React from "react";
// import DetailsEditor from "./DetailsEditor";
import HTMLWriter from "./attribute-editing-components/HTMLWriter";
import SubmitButton from "./attribute-editing-components/SubmitButton";
import TextInput from "./attribute-editing-components/TextInput";
import ToggleButton from "./attribute-editing-components/ToggleButton";
// import TypesEditor from "./TypesEditor";
import EntriesSelector from "./entries-selector/EntriesSelector";
import { firestore } from "../../authentication/firebase";
import { globals } from "../../globals";
// import { tidyEntry } from "../../utils/tidyEntry";
// import "./styles/editor.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    let currentEntry = {};
    const defn = globals.entryDefinition;

    defn.attributes.map(attr => {
      currentEntry[attr.name] = null;
    });

    this.state = { currentEntry };
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    // this.unsubscribeFromFirestore = await firestore
    //   .collection("entries")
    //   .orderBy("dateUTC", "desc")
    //   .onSnapshot(snapshot => {
    //     const entries = snapshot.docs;
    //     this.setState({ entries });
    //   });
  };

  loadEntry = entry => {
    // STUB

    this.setState(entry);
    // let newEntry = {};
    //
    // this.entryAttributes.map(attr => {
    //   if (entry[attr]) {
    //     newEntry[attr] = entry[attr];
    //   } else {
    //     newEntry[attr] = "";
    //   }
    // });
    //
    // newEntry["html"] = entry["html"];
    // newEntry["tags"] = entry["tags"];
    // newEntry["Is Featured"] = entry["Is Featured"];
    // newEntry["Show By Default"] = entry["Show By Default"];
    //
    // this.setState({
    //   currentEntry: newEntry,
    //   oldName: entry.Name,
    //   revising: true
    // });
  };

  resetWriter = () => {
    let currentEntry = {};
    const defn = globals.entryDefinition;
    defn.attributes.map(attr => {
      currentEntry[attr.name] = null;
    });

    this.setState({ currentEntry, revising: false });
    this.render();
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(state => {
      let newEntry = state.currentEntry;
      newEntry[name] = value;
      return { currentEntry: newEntry };
    });
  };

  handleSubmit = event => {
    this.state.revising ? this.updateEntry(event) : this.submitNewEntry(event);
  };

  submitNewEntry = event => {
    event.preventDefault();
    // let { errors, entry } = validateEntry(this.state.currentEntry);
    //
    // if (errors.length) {
    //   errors.map(err => alert(err.message));
    // } else {
    //   firestore
    //     .collection("entries")
    //     .doc(entry.Name)
    //     .set(entry);
    //   this.resetWriter();
    // }
  };

  deleteEntry = entryName => {
    if (confirm("You sure, bro?")) {
      firestore
        .collection("entries")
        .doc(entryName)
        .delete();
      this.resetWriter();
    }
  };

  updateEntry = event => {
    event.preventDefault();
    // let { errors, entry } = validateEntry(this.state.currentEntry);
    //
    // if (errors.length) {
    //   errors.map(err => alert(err.message));
    // } else {
    //   firestore
    //     .collection("entries")
    //     .doc(this.state.oldName)
    //     .set({ ...entry });
    //   this.resetWriter();
    // }
  };

  render() {
    return (
      <div id="editor-container">
        <div id="main-editor">
          <h1>Write an Entry</h1>

          <form>
            {globals.entryDefinition.attributes.map(attr => {
              switch (attr.type) {
                case "boolean":
                  return (
                    <ToggleButton
                      key={`toggle-for-${attr.name}`}
                      label={attr.name}
                      checked={this.state.currentEntry[attr.name]}
                      handleChange={this.handleChange}
                    />
                  );

                case "html":
                  return (
                    <HTMLWriter
                      key={`writer-for-${attr.name}`}
                      contents={
                        this.state.currentEntry[attr.name]
                          ? this.state.currentEntry[attr.name]
                          : ""
                      }
                      handleChange={this.handleChange}
                    />
                  );

                case "object":
                  //STUB
                  break;

                default:
                  return (
                    <TextInput
                      key={`text-input-for-${attr.name}`}
                      label={attr.name}
                      contents={this.state.currentEntry[attr.name]}
                      type={attr.type}
                      handleChange={this.handleChange}
                    />
                  );
              }
            })}

            <SubmitButton handleSubmit={this.handleSubmit} />
          </form>

          <EntriesSelector
            entries={this.state.entries}
            loadEntry={this.loadEntry}
            deleteEntry={this.deleteEntry}
          />
        </div>
      </div>
    );
  }
}

export default Editor;
