
HabitList = React.createClass({

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
            editModalOpen : false,
            editModalHabit: {}, 

          }

        },

        openModal (habit) {
            this.setState({
              
              editModalOpen : true
            });
              
         },

         checkStreak(){

         
         	habit = this.props.habit;
         	console.log(habit);

         	if(habit.Poslog.length > 0){
         		var logtype = this.props.habit.Poslog; 	

         	}
         	else{
         		var logtype = this.props.habit.Neglog;
         	}

         	var yesterday = moment().day(-1);
        	

        	for (var i = 0; i < logtype.length; i++){

        		var date = logtype[i];
        		console.log(date);

        		if(moment(date).format("MMM Do YY") == yesterday.format("MMM Do YY")){

        			var increased = true;

        		}
        		else{ var increased=false}

			}

         	if(this.props.habit){}

         },

         closeModal () {
            this.setState({
              editModalOpen: false

            });


          },



			deleteThisHabit() {
			    Habits.remove(this.props.habit._id);
			  },

			  editThisHabit() {
			  	console.log("open please");

			    this.setState({
	              editModalHabit: this.props.habit, 
	              editModalOpen: true

           		 });
			  },

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
	  					 	$inc: {"profile.experience": 35, "profile.karma":  25, "profile.currentExp": 35, "profile.actions": 1 }
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: 25}
					 	 }
					)
				}
				if(this.props.habit.importance== '#f0ad4e'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 30, "profile.karma":  20, "profile.currentExp":30 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: 20}
					 	 }
					)

				}
				if(this.props.habit.importance == '#FFCC00'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 28, "profile.karma":  15, "profile.currentExp":28 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: 15}
					 	 }
					)
				}
				if(this.props.habit.importance == '#5cb85c'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 25, "profile.karma":  10, "profile.currentExp":25 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: 10}
					 	 }
					)
				}
				if(this.props.habit.importance == '#5bc0de'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 20, "profile.karma":  5, "profile.currentExp":20 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: 20}
					 	 }
					)
				}

				this.forceUpdate();
			},

			handleNegative(event, id) {

				var message = "a notification";
				var action = 'an action';

				this.props.handleNotification(message, action);

				

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
	  					 	$inc: {"profile.experience": 20, "profile.karma":  -17, "profile.health":  -10, "profile.currentExp":20 ,"profile.actions": 1}
	  					 	
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: -17}
					 	 }
					)
				}
				if(this.props.habit.importance== '#f0ad4e'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 17, "profile.karma":  -10, "profile.health":  -10, "profile.currentExp":17 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: -10}
					 	 }
					)
				}
				if(this.props.habit.importance == '#FFCC00'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 15, "profile.karma":  -7, "profile.health":  -5, "profile.currentExp":15 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: -7}
					 	 }
					)
				}
				if(this.props.habit.importance == '#5cb85c'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 12 ,"profile.karma":  -5, "profile.health":  -5, "profile.currentExp":12 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: -5}
					 	 }
					)
				}
				if(this.props.habit.importance == '#5bc0de'){
					Meteor.users.update(
	  				 { _id: userid},
	  					 { 
	  					 	$inc: {"profile.experience": 10, "profile.karma":  -2, "profile.health":  -5, "profile.currentExp":10 ,"profile.actions": 1}
	  					   }
					);
					Habits.update(
	  					 { _id: this.props.habit._id },
	  					 { 
	  					 		$inc: {recievedKarma: - 2}
					 	 }
					)
					this.forceUpdate();
				}
				

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



						var now = new Date();
						var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0) - now;
						if (millisTill10 < 0) {
						     millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
						}
						setTimeout(function(){ this.checkStreak()}, millisTill10);

					
		
				return(
					<li onClick={this.props.onClick} className="habit-listItem">						
						{button}
				        <span className="habit-title">{this.props.habit.title}</span>
				        <div className = "color-code" style={styles}></div>
				        <button className="delete" onClick={this.editThisHabit}>
				          <span className="icon-pencil-4"> </span>
				        </button>
				        <button className="delete" onClick={this.deleteThisHabit}>
				          <span className="icon-trash-8"> </span>
				        </button>
				        <EditModal closeModal={this.closeModal} habit={this.state.editModalHabit} isOpen={this.state.editModalOpen} />
				    </li>	

					);
			}
		});