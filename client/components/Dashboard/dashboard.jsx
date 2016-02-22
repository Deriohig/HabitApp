Dashboard = React.createClass({


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


			  	return {
			  		controlledModalOpen : false,
			  		selected: "month",
			  		graphType: "bar"
			  	};

			  },

			  setGraphType(value){

			  	
			  	console.log(value);
			  	
			  	this.setState({graphType: value});
			  	// console.log(this.state.selected);
			  	
			  },
			  setGraphLength(value){

			  	
			  	console.log(value);
			  	
			  	this.setState({selected: value});
			  	// console.log(this.state.selected);
			  	
			  },

			  generateDataOnSelection(){
			  	var data= {};
			  	console.log(this.state);
			  	

			  	if(this.state.selected == "week"){

			  		 data = this.mapWeekData(allNeg, allPos);
			  	}
			  	else{
			  		data= this.mapMonthData(allNeg, allPos);
			  	}

			  	return data;

			  },

			  mapWeekData(array, array2) {  
			  		var i = 0 ; 		
			  		var data = [
			  			{ negQty:0, posQty: 0, xLabel: "Sun" }, 
			  			{ negQty:0, posQty: 0, xLabel: "Mon" },
			  			{ negQty:0, posQty: 0, xLabel: "Tue" },
			  			{ negQty:0, posQty: 0, xLabel: "Wed" },
			  			{ negQty:0, posQty: 0, xLabel: "Thu" },
			  			{ negQty:0, posQty: 0, xLabel: "Fri" },
			  			{ negQty:0, posQty: 0, xLabel: "Sat" },
			  		];
			  		
			  		array.map(function(d) {  
				      data[moment(d.date).weekday()].negQty += 1;
				      	
				    });
				    var i = 0;
				    array2.map(function(d) { 
				      data[moment(d.date).weekday()].posQty += 1;			     
				    });			   		    
				    return data;
				},

				mapMonthData(array, array2) { 
					var i = 0 ;
					var data = [
			  			{ negQty:0, posQty: 0, xLabel: "Jan" }, 
			  			{ negQty:0, posQty: 0, xLabel: "Feb" },
			  			{ negQty:0, posQty: 0, xLabel: "Mar" },
			  			{ negQty:0, posQty: 0, xLabel: "Apr" },
			  			{ negQty:0, posQty: 0, xLabel: "May" },
			  			{ negQty:0, posQty: 0, xLabel: "Jun" },
			  			{ negQty:0, posQty: 0, xLabel: "Jul" },
			  			{ negQty:0, posQty: 0, xLabel: "Aug" },
			  			{ negQty:0, posQty: 0, xLabel: "Sep" },
			  			{ negQty:0, posQty: 0, xLabel: "Oct" },
			  			{ negQty:0, posQty: 0, xLabel: "Nov" },
			  			{ negQty:0, posQty: 0, xLabel: "Dec" }
			  		];

			  		array.map(function(d) {  
				      data[moment(array[i].date).month()].negQty += 1;
				      i++;	
				    });
				    var i = 0;
				    array2.map(function(d) { 
				      data[moment(array2[i].date).month()].posQty += 1;
				       i++;				     
				    });			   		    
				    return data;

				},

			  

			

			  changeGraph(value){

			  	return 

			  },
			 
			  

			render: function(){

				var MaxExp = Meteor.user().profile.maxExp;
				var CurrentExp = Meteor.user().profile.currentExp;
				var health = Meteor.user().profile.health;

				var expValue = CurrentExp/MaxExp;
				var expPercent = expValue *100;

				

				
				var avatarstyle = {height:'200px',
									backgroundColor:'#3b97d3'
										};
				
				var topblockgrey = {height:'100px',
				
									backgroundColor:'#f1f2f2' };

				var topblockoffgrey = {height:'100px',
				

									   backgroundColor:'#e6e7e8' };	

				var experience = {	height:'75px',
									width: expPercent +'%',
									backgroundColor:'#e0b72e',
									color: '#2e2200'};	

				var health = {height:'75px',
								width: health +'%',
									   backgroundColor:'#e11c44',
									   color: '#2e2200' };


				var currentUserId = Meteor.userId();			
				var allHabits = Habits.find({createdBy: currentUserId}, {sort: {createdAt: -1}}).fetch();
				var allPos = [];
				var allPosGraph = ['Negative Habits'];
				var allNeg = []; 
				var allNegGraph = ['Positive Habits']; 


                        for(var incr = 0; incr < allHabits.length; incr ++){

                        		if(allHabits[incr].Poslog.length > 0){
                        			

                        			for(var i = 0; i < allHabits[incr].Poslog.length; i++){

                        				

                        				allPos.push({date : allHabits[incr].Poslog[i]});
                        				
                        			}

                        		}
                        }
                        for(var incr = 0; incr < allHabits.length; incr ++){

                        		if(allHabits[incr].Neglog.length > 0){
                        			

                        			for(var i = 0; i < allHabits[incr].Neglog.length; i++){

                        				allNeg.push({date: allHabits[incr].Neglog[i]});
                        				
                        			}

                        		}
                        }
                    
				var totalhabits = allHabits.length;


				var iconStyle = {	fontSize :'30px', color:'#92278f', float: 'left' , paddingTop: '30px', paddingRight	: '20px'};


				var monthData= this.mapMonthData(allNeg, allPos);
				var weekData = this.mapWeekData(allNeg, allPos);
				var ChartType;

				if(this.state.selected == "week"){

					    ChartType = <center><BarCharty graphType={this.state.graphType} dataweek={weekData} selection={this.state.selected} width="1000" height="400"/></center>
								
				}
				if (this.state.selected == "month"){
						ChartType = <center><BarChartx datamonth={monthData} graphType={this.state.graphType} selection={this.state.selected} width="1000" height="400"/></center>
				}


				return(

					<div className="col-xs-11">
		 				
						<div className="row">


							<div className="col-md-3" style= {avatarstyle}> <h3> Level: {Meteor.user().profile.level}</h3> </div>
							<div className="col-md-3" style= {topblockgrey}><span className = "iconleft"><i className="icon-child" style={iconStyle}></i></span><div className="infoData"><span className="dataPoint">{totalhabits}</span><h4>Registered Habits</h4></div> </div>
							<div className="col-md-3" style= {topblockoffgrey}><span className = "iconleft"><i className="icon-plus-squared" style={iconStyle}></i></span><div className="infoData"><span className="dataPoint">{allPos.length}</span> <h4>Positive Actions</h4></div></div>
							<div className="col-md-3" style= {topblockgrey}><span className = "iconleft"><i className="icon-minus-squared" style={iconStyle}></i></span><div className="infoData"><span className="dataPoint">{allNeg.length}</span><h4>Negative Actions</h4></div></div>

							<div className="col-md-3"style= {topblockoffgrey}><span className = "iconleft"><i className="icon-money" style={iconStyle}></i></span><div className="infoData"><span className="dataPoint">{Meteor.user().profile.karma}</span><h4>Karma Points</h4></div></div>
							<div className="col-md-3" style= {topblockgrey}><span className = "iconleft"><i className="icon-arrows-cw" style={iconStyle}></i></span><div className="infoData"><span className="dataPoint"></span><h4>Longest Streak</h4></div></div>
							<div className="col-md-3" style= {topblockoffgrey}><span className = "iconleft"><i className="icon-pitch" style={iconStyle}></i></span><div className="infoData"><span className="dataPoint">{Meteor.user().profile.actions}</span><h4>Completed Actions</h4></div></div>

						</div>

						<div className="row">
							<div className="col-xs-12 clear-padding">								
								<div className="col-md-6 clear-padding progress"><div className="progress-bar" role="progressbar progress-bar-warning" style={experience} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"><i className="icon-chart" style={{fontSize:'30px', float:'left'}}></i></div></div>								
								<div className="col-md-6 clear-padding progress" style= {{backgroundColor:'#e6e7e8', height:'75px'}} ><div className="progress-bar" role="progressbar progress-bar-danger" style={health} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"><span className="icon-heart"> </span>Health</div></div>
							</div>
						</div>

						<div className="row">
							<div className="col-xs-12">
							<div className="col-xs-9" >
								<div className="col-xs-7" >

									<form action="">
					
										<span> Habits from: </span>	

											  <input type="button"  onClick={this.setGraphLength.bind(this, "week")}  value="Last Week"></input>
											  <input type="button" onClick={this.setGraphLength.bind(this, "month")}  value="Last Month"></input>

										
										<span> All Habits: </span>	

											  <input type="button"  onClick={this.setGraphLength.bind(this, "week")}  value="In Weeks"></input>
											  <input type="button" onClick={this.setGraphLength.bind(this, "month")}  value="In Months"></input>	
									</form>	

								</div>
								<div className="col-xs-5" >

									<form action="">
										<span> Graphs: </span>	

											  <input type="button"  onClick={this.setGraphType.bind(this, "area-spline")}  value="Spline Chart"></input>
											  <input type="button" onClick={this.setGraphType.bind(this, "bar")}  value="Bar Chart"></input>
											  <input type="button"  onClick={this.setGraphType.bind(this, "area-step")}  value="Steped Chart"></input>


									</form>
								</div>	
							</div>
								<div className="col-xs-12">
										{ChartType}
								</div>
							</div>
						</div>
					</div>

					);
			}
		});