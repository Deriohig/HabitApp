RewardList = React.createClass({

		getInitialState(){


	          return {
	          	editModalReward: {},
	            editModalOpen : false

	          }

	        },


			purchaseReward(){
				 var userid = Meteor.userId();

				Meteor.users.update(

	  				 { _id: userid},
	  					 { 
	  					 	$inc: { "profile.karma":  - this.props.reward.cost},
	  					 	$push: { "profile.purchaseLog.reward": {obj: this.props.reward, time: new Date() } }, 

	  					   }
					)

			},

			deleteThisReward() {
			    Rewards.remove(this.props.reward._id);
			},

			openModal () {
	            this.setState({
	              editModalOpen : true
	            });
	         },

	         closeModal () {
	            this.setState({
	              editModalOpen: false

	            });
	          },

	           editThisReward() {
			  	console.log("open please");

			    this.setState({
	              editModalReward: this.props.reward, 
	              editModalOpen: true

           		 });
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

						var styles={
							width: '12px',
							height:'12px',
							margin: '10px',
							borderRadius: '20%',			
							float:'right'
						};			
		
				return(
					<li onClick={this.props.onClick} className="reward-listItem">						
						<button className="purchaseButton pull-right" onClick= {this.purchaseReward}>Buy</button>
				        <span className="reward-title">{this.props.reward.title}</span>
				      

				        <button className="delete" onClick={this.editThisReward}>
				          <span className="icon-pencil-4"> </span>
				        </button>
				        <button className="delete" onClick={this.deleteThisReward}>
				          <span className="icon-trash-8"> </span>
				        </button>
				        <br></br>
						<span className="reward-info"> Cost: {this.props.reward.cost} </span>
				        
				        <EditRewardModal closeModal={this.closeModal} reward={this.state.editModalReward} isOpen={this.state.editModalOpen} />
				    </li>	

					);
			}
		});

			
RewardsContent= React.createClass({


			mixins: [ReactMeteorData],
			 
			  // Loads items from the Tasks collection and puts them on this.data.tasks
			  getMeteorData() {
			  	var currentUserId = Meteor.userId();
			    return {
			      Rewards: Rewards.find({createdBy: currentUserId}, {sort: {createdAt: -1}}).fetch(),
			      currentUser: Meteor.user(),
			      purchaseLog: Meteor.user().profile.purchaseLog, 
			      editModalOpen: false 
			    };
			  },


			  getInitialState(){

			  	var currentUserId = Meteor.userId();
			  	var reward = Rewards.findOne({createdBy: currentUserId});
			  	var currentUser = Meteor.userId();

				  	return {
				  		
				  		editModalOpen : false
				  	};

			  },


			   openModal () {
				    this.setState({
				      editModalOpen : true
				    });
			   },

			   closeModal () {
				    this.setState({
				      editModalOpen : false
				    });
				  },

			 
			  renderRewards() {
			    return this.data.Rewards.map((reward) => {
			      return <RewardList key={reward._id} reward={reward} />;
			    }.bind(this));
			  },


			render: function(){

				var MaxExp = Meteor.user().profile.maxExp;
				var CurrentExp = Meteor.user().profile.currentExp;
				var health = Meteor.user().profile.health;

				var expValue = CurrentExp/MaxExp;
				var expPercent = expValue *100;

				var fixMargin = {margin: "0px" };

				var experience = {	height:'25px',
									width: expPercent +'%',
									backgroundColor:'#e0b72e',
									color: '#2e2200'};	

				var health = {height:'25px',
								width: health +'%',
									   backgroundColor:'#e11c44',
									   color: '#2e2200' };

				var objval = this.state.reward;

				var visdata = this.state.reward;
			
				var titlestyle = {fontSize: '18px', fontStyle: 'bold', margin:'15px' }

				var iconStyle = {fontSize :'26px'};
				var Buttonstyle = {position:'relative', top: '-34px', border:'none', background: 'none', };
				
				console.log(this.data.purchaseLog);

				return(

					<div className="col-xs-11 clear-padding">
		 				
						<div className="col-xs-4 clear-padding">

    						
					       <div className="col-xs-12 clear-padding" style={{backgroundColor:'#eee', height:'50px'}} >
					      	<div style={titlestyle}>
						      
						      <center><span style={titlestyle}>Rewards</span></center> 

						     	<button style={Buttonstyle} className="pull-right" action={this.handleSubmit} onClick={this.openModal}><center><i className="icon-plus-1" style={iconStyle} ></i></center></button>

						    
						      <RewardsModal closeModal={this.closeModal} isOpen={ this.state.editModalOpen } />

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
							
							<ul className="col-xs-12 clear-padding" style= {{height: '100vh', borderLeft : "#eee solid 2px", borderRight:"#eee solid 2px"}}>
								{this.renderRewards()}
							</ul>

						</div>

						<div className="col-xs-8 clear-padding">

							<div className="row" style={fixMargin}>
								<div className="col-xs-12 clear-padding">
									<div className="col-md-2">
										<div className="hexagon">
										  <div className="hexTop"></div>
										  <div className="hexBottom"></div>
										</div>	
									</div>
									<div className="col-md-10" style={fixMargin}>
										<ProgressBars/>
										<h4>Karma Points:{Meteor.user().profile.karma} Level:{Meteor.user().profile.level} </h4>
									</div>
								</div>
							</div>

							<div className="col-md-12" >

								<RewardsTableData data={this.data.purchaseLog} />
							
							</div>
					</div>
					</div>

					);
			}
		});
		
