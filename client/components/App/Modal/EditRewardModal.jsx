EditRewardModal = React.createClass({

  
  handleSubmit(event) {


            event.preventDefault();
           var currentUserId = Meteor.userId();
       
          // Find the text field via the React ref
          var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
         var cost = ReactDOM.findDOMNode(this.refs.cost).value.trim();


          Rewards.update(
             { _id: this.props.reward._id },
               { 
                  title: text,
                  cost:  cost,
                  createdBy: currentUserId,
                  createdAt: this.props.reward.createdAt // current time 
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
          title="Edit Reward">
          <form className="new-habit form-horizontal" style={{ paddingBottom: '5px'}} >


                 <label  class="col-sm-2 control-label">Reward title : </label>
                      <input
                        type="text"
                        className="form-control"
                        ref="textInput"
                      placeholder={this.props.reward.title} />   


                 <label  class="col-sm-2 control-label">Cost: </label>
                      <input
                        type="number"
                        className="form-control"
                        ref="cost"
                      placeholder={this.props.reward.cost} /> 

                <button onClick={this.handleSubmit} className="add-habit pull-left">Update Reward</button>

            </form> 
         
        </Modal>
      </div>
    );
  }
});