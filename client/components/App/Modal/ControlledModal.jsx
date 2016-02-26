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
            recievedKarma:0,
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
  render() {

    return (
      <div>
        <Modal
          isOpen={ this.props.isOpen }
          close={ this.props.closeModal }
          title="Add Habit">
          <form className="new-habit form-horizontal" style={{ paddingBottom: '5px'}} >


                 <label  class="col-sm-2 control-label">What Habit do you want to form? : </label>
                      <input
                        type="text"
                        className="form-control"
                        ref="textInput"
                      placeholder="Type to add new habit" />   


                 <label  class="col-sm-2 control-label">How often do you want to perform it per week? : </label>
                      <input
                        type="number"
                        className="form-control"
                        ref="freqInput"
                      placeholder="Target goal per week?" />

                <label  class="col-sm-2 control-label"> Is it a good(positive) or bad(negative) habit? : </label>

                <select ref="state" className="form-control">
                  <option value= "1">Positive</option>
                  <option value= "2">Negative</option>
            
                </select>  

                 <label  class="col-sm-2 control-label"> How difficult is it? : </label>

                <select ref="importance" className="form-control">
                  <option value= "#d9534f">Very Hard</option>
                  <option value= "#f0ad4e">Hard</option>
                  <option value ="#FFCC00">Moderate</option>
                  <option value ="#5cb85c">Easy</option>
                  <option value ="#5bc0de">Very Easy</option>

                </select>  

                <button onClick={this.handleSubmit}  className="add-habit pull-left"> Add Habit</button>

                  </form> 
         
        </Modal>
      </div>
    );
  }
});