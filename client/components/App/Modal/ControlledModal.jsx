ControlledModal = React.createClass({

  handleSubmit(event) {


          event.preventDefault();
           var currentUserId = Meteor.userId();
       
          // Find the text field via the React ref
          var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        var state = ReactDOM.findDOMNode(this.refs.state).value.trim();
        var freq = ReactDOM.findDOMNode(this.refs.freqInput).value.trim();
        var imp = ReactDOM.findDOMNode(this.refs.importance).value;
          Habits.insert({
            title: text,
            buttonState: state,
            actions: 0,
            streak: 0,
            beststreak: 0,
            frequency: freq,
            Poslog: [],
            Neglog: [],
            importance:  imp,
            createdBy: currentUserId,
            createdAt: new Date() // current time
          });
       
          // Clear form
          ReactDOM.findDOMNode(this.refs.textInput).value = "";
          ReactDOM.findDOMNode(this.refs.freqInput).value = "";
          this.props.closeModal();
        },
  render () {

    return (
      <div>
        <Modal
          isOpen={ this.props.isOpen }
          close={ this.props.closeModal }
          title="Add Habit">
          <form className="new-habit "form-horizontal"" style={{ paddingBottom: '5px'}} >
                      <input
                        type="text"
                        ref="textInput"
                      placeholder="Type to add new habit" />                     

                      <input
                        type="number"
                        ref="freqInput"
                      placeholder="Target goal per week?" />

                <select ref="state">
                  <option value= "1">Positive</option>
                  <option value= "2">Negative</option>
                  <option value ="3">Neutral</option>
                </select>  

                <select ref="importance">
                  <option value= "#d9534f">Very Hard</option>
                  <option value= "#f0ad4e">Hard</option>
                  <option value ="#FFCC00">Moderate</option>
                  <option value ="#5cb85c">Easy</option>
                  <option value ="#5bc0de">Very Easy</option>

                </select>  

                <button onClick={this.handleSubmit}  className="add-habit pull-right"> Submit Habit</button>

                  </form> 
          <button onClick={ this.props.closeModal }>Click Here to Close</button>
        </Modal>
      </div>
    );
  }
});