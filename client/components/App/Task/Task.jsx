// Task component - represents a single todo item
// Task component - represents a single todo item

TaskTable = React.createClass({
 
   mixins: [ReactMeteorData],
 
  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
       tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
       incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user()
    };
  },
 
  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (

      <div className="col-xs-9">
          { this.data.currentUser ?
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>  : ''
          }  
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});

Task = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: React.PropTypes.object.isRequired
  },


  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: {checked: ! this.props.task.checked}
    });
  },
 
  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  },

  render() {
     const taskClassName = this.props.task.checked ? "checked" : "";
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />
 
        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
});