EditModal = React.createClass({

  
  handleSubmit(event) {


        event.preventDefault();
        var currentUserId = Meteor.userId();
       
          // Find the text field via the React ref
        var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        var freq = ReactDOM.findDOMNode(this.refs.freqInput).value.trim();
        var imp = ReactDOM.findDOMNode(this.refs.importance).value;


          Habits.update(
             { _id: this.props.habit._id },
               { 
                title: text,
                buttonState: this.props.habit.buttonState,
                actions: this.props.habit.actions,
                streak: this.props.habit.streak,
                beststreak: this.props.habit.beststreak,
                recievedKarma: this.props.habit.recievedKarma,
                frequency: freq,
                Poslog: this.props.habit.Poslog,
                Neglog: this.props.habit.Neglog,
                importance: imp,
                createdBy: currentUserId,
                createdAt: this.props.createdAt 
               }
          )
       
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
                        placeholder={this.props.habit.title} />   


                 <label  class="col-sm-2 control-label">How often do you want to perform it per week? : </label>
                      <input
                        type="number"
                        className="form-control"
                        ref="freqInput"
                        placeholder={this.props.habit.frequency} />

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