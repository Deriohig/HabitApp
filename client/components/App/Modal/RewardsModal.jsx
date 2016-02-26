RewardsModal = React.createClass({

  handleSubmit(event) {


          event.preventDefault();
           var currentUserId = Meteor.userId();
       
          // Find the text field via the React ref
          var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
         var cost = ReactDOM.findDOMNode(this.refs.cost).value.trim();
        
          Rewards.insert({
            title: text,
            cost:  cost,
            createdBy: currentUserId,
            createdAt: new Date() // current time
          });
       
          // Clear form
          ReactDOM.findDOMNode(this.refs.textInput).value = "";
          ReactDOM.findDOMNode(this.refs.cost).value = "";
          this.props.closeModal();
        },
  render() {

    return (
      <div>
        <Modal
          isOpen={ this.props.isOpen }
          close={ this.props.closeModal }
          title="Add Reward">
          <form className="new-habit form-horizontal" style={{ paddingBottom: '5px'}} >


                 <label  class="col-sm-2 control-label">Reward title : </label>
                      <input
                        type="text"
                        className="form-control"
                        ref="textInput"
                      placeholder="Reward title" />   


                 <label  class="col-sm-2 control-label">Cost: </label>
                      <input
                        type="number"
                        className="form-control"
                        ref="cost"
                      placeholder="Cost of reward" /> 

                <button onClick={this.handleSubmit} className="add-habit pull-left">Add Reward</button>

            </form> 
         
        </Modal>
      </div>
    );
  }
});