		
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
			  		controlledModalOpen : false,
			  		editModalOpen : false,
			  		editModalHabit: {}, 
			  		isNotificationActive: false,
			  		notificationMessage: "a Notification",
			  		notificationAction: "Completed",
			  		dismissNotificationAfter: 2000

			  	}

			  },

			handleNotificationPop(event, message, action) {

				console.log(this.state)
				var that = this;
				this.setState({
							   notificationMessage: message,
							   notificationAction: action,
							   isNotificationActive: true});

				

				setTimeout(function(){ that.setState({
				      isNotificationActive : false
				    }); }, 3000);
						   

			},
			   openModal () {
				    this.setState({
				      controlledModalOpen : true
				    });
				      
			   },

			   closeModal () {
				    this.setState({
				      controlledModalOpen : false,
				      editModalOpen: false

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
			  	console.log(this.data);
			    return this.data.habits.map((habit) => {
			      return <HabitList onClick={this.handleSelection.bind(null, habit)} handleNotification={this.handleNotificationPop}  key={habit._id} habit={habit} />;
			    }.bind(this));
			  },

			

			render: function(){
				

				var visdata = this.state.habit;
			
				var titlestyle = {fontSize: '18px', fontStyle: 'bold', margin:'15px' }

				var iconStyle = {fontSize :'26px'};
				var Buttonstyle = {position:'relative', top: '-34px', border:'none', background: 'none', };
				


				return(

					<div className="col-xs-11 clear-padding">
		 				
						<div className="col-xs-4 clear-padding">

    						
					       <div className="col-xs-12 clear-padding" style={{backgroundColor:'#eee', height:'50px'}} >
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

						<div className="col-xs-8 clear-padding" style= {{borderLeft : "#eee solid 2px"}}>

						<div className="col-md-12 clear-padding">
						<Calendar selected={moment().startOf("day")} obj={this.state.habit}/>
						
						</div>
						
						</div>

						<Notification
						  dismissAfter= {this.state.dismissNotificationAfter}
						  isActive={this.state.isNotificationActive}
						  message={this.state.notificationMessage}
						  action={this.state.notificationAction}
						/>


					</div>

					);
			}
		});
		
