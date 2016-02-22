	HabitList = React.createClass({



			handlePositive(event, id) {
			    event.preventDefault();
			    var userid = Meteor.userId();
			    // Find the text field via the React ref
			    Habits.update(
  				 { _id: this.props.habit._id },
  					 { $addToSet: { Poslog: new Date() }, 
  					 		$inc: {actions: 1}
				 	 }
				)
				if(this.props.habit.importance == '#d9534f'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 35, "profile.karma":  25, "profile.currentExp": 35}
	  					   }
					)
				}
				if(this.props.habit.importance== '#f0ad4e'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 30, "profile.karma":  20, "profile.currentExp":30}
	  					   }
					)
				}
				if(this.props.habit.importance == '#FFCC00'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 28, "profile.karma":  15, "profile.currentExp":28}
	  					   }
					)
				}
				if(this.props.habit.importance == '#5cb85c'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 25, "profile.karma":  10, "profile.currentExp":25}
	  					   }
					)
				}
				if(this.props.habit.importance == '#5bc0de'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 20, "profile.karma":  5, "profile.currentExp":20}
	  					   }
					)
				}
			},

			handleNegative(event, id) {

				var userid = Meteor.userId();
			    event.preventDefault();
			    // Find the text field via the React ref
			    Habits.update(
  				 { _id: this.props.habit._id },
  					 { $addToSet: {Neglog: new Date()} ,
  					 	$inc: {actions: 1}
  					   }
				)
				if(this.props.habit.importance == '#d9534f'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 20, "profile.karma":  -17, "profile.health":  -10, "profile.currentExp":20}
	  					 	
	  					   }
					)
				}
				if(this.props.habit.importance== '#f0ad4e'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 17, "profile.karma":  -10, "profile.health":  -10, "profile.currentExp":17}
	  					   }
					)
				}
				if(this.props.habit.importance == '#FFCC00'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 15, "profile.karma":  -7, "profile.health":  -5, "profile.currentExp":15}
	  					   }
					)
				}
				if(this.props.habit.importance == '#5cb85c'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 12 ,"profile.karma":  -5, "profile.health":  -5, "profile.currentExp":12}
	  					   }
					)
				}
				if(this.props.habit.importance == '#5bc0de'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 10, "profile.karma":  -2, "profile.health":  -5, "profile.currentExp":10}
	  					   }
					)
				}

			},

			deleteThisHabit() {
			    Habits.remove(this.props.habit._id);
			  },


			render:function (){
				function calculateNextLevel(level){

				 	var maxXP = 0.25 * Math.pow(level, 2) + 10 * 4 +139; 

				 	return maxXP
				};

				function LevelUp(level){
				var userid = Meteor.userId();
				 console.log("levelUp");
				 var lvlVal = level + 1;
				 var max = calculateNextLevel(lvlVal);
				 Meteor.users.update({ _id: userid}, { $set: {'profile.health': 100, 'profile.currentExp' : 0, 'profile.maxExp': max} , $inc: {"profile.level": 1} }); 

				};

				if (Meteor.user().profile.maxExp <= Meteor.user().profile.currentExp){
					console.log("trigger level up");
					LevelUp(Meteor.user().profile.level);
				}

						
   						if(this.props.habit.buttonState == 1){
							var button = <button className=" state-button positive-state" onClick= {this.handlePositive}>+</button>;
						}
						if(this.props.habit.buttonState == 2){
							var button = <button className="state-button negative-state" onClick= {this.handleNegative}>-</button>;
						}
						if(this.props.habit.buttonState == 3){
							var button = 
							<div className="neut-state-button">
								<button className="neutral-state-neg" onClick= {this.handlePositive}>+</button>
								<button className="neutral-state-pos" onClick= {this.handleNegative}>-</button>
							</div>;
						}		
							
						var styles={
							width: '12px',
							height:'12px',
							margin: '10px',
							borderRadius: '20%',
							backgroundColor: this.props.habit.importance,
							
							float:'right'
						};			
		
				return(
					<li onClick={this.props.onClick} className="habit-listItem">						
						{button}
				        <span className="habit-title">{this.props.habit.title}</span>
				        <div className = "color-code" style={styles}></div>
				        <button className="delete" onClick={this.deleteThisHabit}>
				          &times;
				        </button>
				        
				    </li>	

					);
			}
		});

			
		HabitContent= React.createClass({


			mixins: [ReactMeteorData],
			 
			  // Loads items from the Tasks collection and puts them on this.data.tasks
			  getMeteorData() {
			  	var currentUserId = Meteor.userId();
			    return {
			      habits: Habits.find({createdBy: currentUserId}, {sort: {createdAt: -1}}).fetch(),
			      currentUser: Meteor.user()
			    };
			  },


			  getInitialState(){

			  	var currentUserId = Meteor.userId();
			  	var habit = Habits.findOne({createdBy: currentUserId});
			  	var currentUser = Meteor.userId();
			  	
			  	if (habit == undefined){
			  		var habitSeed ={title: "Add your own habit", buttonState: "1", actions: 6, streak: 0, createdBy: currentUser, Neglog: [], Poslog:[]};
			  	}
			  	else{
			  		var habitSeed = Habits.findOne({createdBy: currentUserId})
			  	}

			  	return {
			  		habit: habitSeed,
			  		controlledModalOpen : false
			  	};

			  },
			   openModal () {
				    this.setState({
				      controlledModalOpen : true
				    });
			   },

			   closeModal () {
				    this.setState({
				      controlledModalOpen : false
				    });
				  },

			  handleSelection(habit, event){
			  	this.setState({habit:habit});

			  		if (this.state.selected === ''){
           					 this.setState({selected: 'selected'});
        				} else {
           					 this.setState({selected: ''});
			 		}}
			  ,
			 
			  renderHabits() {
			    return this.data.habits.map((habit) => {
			      return <HabitList onClick={this.handleSelection.bind(null, habit)} key={habit._id} habit={habit} />;
			    }.bind(this));
			  },

			

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
			  },

			render: function(){
				var objval = this.state.habit;

				var visdata = this.state.habit;
			
				var titlestyle = {fontSize: '18px', fontStyle: 'bold', margin:'15px' }

				var iconStyle = {fontSize :'26px'};
				var Buttonstyle = {position:'relative', top: '-34px', border:'none', background: 'none', };
				


				return(

					<div className="col-xs-11 clear-padding">
		 				
						<div className="col-xs-4 clear-padding">

    						
					       <div className="col-xs-12" style={{backgroundColor:'#eee', height:'50px'}} >
					      	<div style={titlestyle}>
						      
						      <center><span style={titlestyle}>Habits</span></center> 

						     <button style={Buttonstyle} className="pull-right" action={this.handleSubmit} onClick={this.openModal}><center><i className="icon-plus-1" style={iconStyle} ></i></center></button>

						    
						      <ControlledModal closeModal={ this.closeModal } isOpen={ this.state.controlledModalOpen } />

						      </div>
				           </div>


				           {/* 
					        <div className="row filters">
							<button className="col-xs-3 fill">All </button>
							<button className="col-xs-3 fill">Negative </button>
							<button className="col-xs-3 fill">Positive </button> 
							<button className="col-xs-3 fill">Neutral</button> 
							</div>
							*/} 
							
							<ul className="col-xs-12 clear-padding">
								{this.renderHabits()}
							</ul>

						</div>

						<div className="col-xs-8" style= {{borderLeft : "#eee solid 2px"}}>

						<div className="col-md-12 clear-padding">
						<Calendar selected={moment().startOf("day")} obj={objval}/>
						
						</div>
						
						</div>


					</div>

					);
			}
		});
		
