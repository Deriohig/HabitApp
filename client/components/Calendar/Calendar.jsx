var moment = require('moment');
require('moment-range');
Calendar = React.createClass({


			  	componentWillUpdate: function(nextProps) {  		
			  		this.render();
			  	},


				getInitialState: function() {
					return {
						month: this.props.selected.clone(),
						selectedDay: moment()
					};
				},
			
				previous: function() {
					var month = this.state.month;
					month.add(-1, "M");
					this.setState({ month: month });
				},
				
				next: function() {
					var month = this.state.month;
					month.add(1, "M");
					this.setState({ month: month });
				},
				
				select: function(day) {
					
					this.props.selected = day.date;
					this.setState({selectedDay:day.date})
					this.forceUpdate();
					
				},
			
				render: function() {
					habitobj = this.props.obj; 

					var data=[];
					var thisDay = this.state.selectedDay;
					
					var dailyAvg = 0;
					var weeklyAvg = 0;
					var monthlyAvg = 0;
					var weekStart = moment().startOf('week');
					var weekEnd = moment().endOf('week');
					var monthStart = moment().subtract( 1, "months");			
					var monthEnd = moment().add(1, "d");				
					var daycount = 0;
					var dayTotal= 0;
					var monthcount = 0;
					var weekcount = 0 ; 
					var monthRange = moment.range(monthStart, monthEnd);
					var dayRange = moment.range(weekStart,weekEnd);
					var weekRange = moment.range(weekStart, weekEnd);

				

					for(var i=0; i< habitobj.Neglog.length; i++){

						var negdate = habitobj.Neglog[i];
						var today = moment();
						
						var date = moment(negdate);
						
						if(date.within(dayRange)){
							daycount ++;
							
						}

						if(date.within(monthRange)){
							monthcount ++;
							
						}
						if(date.within(weekRange)){
							weekcount++;

						}
						if(moment(posdate).format("MMM Do YY") == today.format("MMM Do YY")){
							dayTotal++;

						}

						if(moment(negdate).format("MMM Do YY") == thisDay.format("MMM Do YY")){
					

							data.push({id: i, content:habitobj.title, start:habitobj.Neglog[i], habitType: "Negative" , habitdiff: habitobj.importance});
							

						}
					}

					for(var i=0; i< habitobj.Poslog.length; i++){

						var posdate = habitobj.Poslog[i];
						var today = moment();

						var date = moment(posdate);
						if(date.within(dayRange)){
							daycount ++;
							
						}

						if(date.within(monthRange)){
							monthcount++;
						}
						if(date.within(weekRange)){
							weekcount++;

						}
						if(moment(posdate).format("MMM Do YY") == today.format("MMM Do YY")){
							dayTotal++;

						}

						if(moment(posdate).format("MMM Do YY") == thisDay.format("MMM Do YY")){

							
							data.push({id: i, content:habitobj.title, start:habitobj.Poslog[i], habitType: "Positive" , habitdiff: habitobj.importance});
							

						}
					}

					var dayValue = habitobj.frequency/7 - daycount; 
					if(dayValue < 0){
						dayValue = 0;
					};
					var weekValue = habitobj.frequency - weekcount;
					if(weekValue < 0){
						weekValue = 0;
					};
					var monthValue = habitobj.frequency * 4 - monthcount;
					var dayData = [daycount, dayValue]
					var weekData = [weekcount, weekValue]
					var monthData = [monthcount, monthValue];

					var dayData = [dayTotal,daycount/7];
					

					var styles={
							width: '20px',
							height:'20px',
							margin: '10px',
							borderRadius: '20%',
							backgroundColor: this.props.obj.importance,
							float:'left'
						};

					return <div>
								 <div className = "color-code" style={styles}></div><h2>{this.props.obj.title}</h2> 
								<div className="row"><div className="col-md-12 pie-charts">
								
								<PieChart data={dayData} divId={"total-logs"} color={"#5dba47"} title={"Daily Target"}/>
								<PieChart data={weekData} divId={"Daily"} color={"#3b97d3"} title={"Weekly Target"}/>
								<PieChart data={monthData} divId={"Weekly"}color={"#db4258"} title={"Monthly Target"}/>				
								</div></div>
									<div className="row">
										<div className="calendar">
											<div className="header">
												<i className="fa fa-angle-left" onClick={this.previous}></i>
												{this.renderMonthLabel()}
												<i className="fa fa-angle-right" onClick={this.next}></i>
											</div>
											<DayNames />
											{this.renderWeeks()}
										</div>
										<TableData data={data}/>
										{/* 
											<Graph graph={data}/>
										*/}
									</div>								
							</div>;
					
				},
				
				renderWeeks: function() {
					var weeks = [],
                    	done = false,
						date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
						monthIndex = date.month(),
						count = 0;
						
						
                    while (!done) {
						weeks.push(<Week key={date.toString()} date={date.clone()} obj={this.props.obj} month={this.state.month}  select={this.select} selected={this.props.selected} />);
                        date.add(1, "w");
                        done = count++ > 2 && monthIndex !== date.month();
                        monthIndex = date.month();
                    }
					
					return weeks;
				},
				
				renderMonthLabel: function() {
					return <span className="month-title">{this.state.month.format("MMMM, YYYY")}</span>;
				},
			});
			
			var DayNames = React.createClass({
				render: function() {
					return <div className="week names">
						<span className="dayName">Sun</span>
						<span className="dayName">Mon</span>
						<span className="dayName">Tue</span>
						<span className="dayName">Wed</span>
						<span className="dayName">Thu</span>
						<span className="dayName">Fri</span>
						<span className="dayName">Sat</span>
					</div>;
				}
			});
			
			var Week = React.createClass({
				render: function() {
					var days = [],
						date = this.props.date,
						month = this.props.month,
						habit = this.props.obj; 
						 
						
                    for (var i = 0; i < 7; i++) {
                    	
                        var day = {
                            name: date.format("dd").substring(0, 1),
                            number: date.date(),
                            isCurrentMonth: date.month() === month.month(),
                            isToday: date.isSame(new Date(), "day"),
                            date: date,
                            daycolor: "#95a5a6",
                            type:"day",
                            joincolor:'white'
                        };
                      
                    if(habit.Neglog.length> 0){
                        for(inc=0; inc < habit.Neglog.length; inc ++){

                        		var NegDate= habit.Neglog[inc];

                        		if(moment(NegDate).format("MMM Do YY") == date.format("MMM Do YY")){

                        			day.type= "Negday";
                        			day.daycolor="#e74c3c";
                        			day.joincolor= "#e74c3c";

                        		}

                   
                        }

                    }

                    if(habit.Poslog.length> 0){
                        for(var incr = 0; incr < habit.Poslog.length; incr ++){

                        		var Posdate= habit.Poslog[incr];

                        		if(moment(Posdate).format("MMM Do YY") == date.format("MMM Do YY")){

                        			day.type= "Posday";
                        			day.daycolor = "#2ecc71";
                        			day.joincolor= "#2ecc71";
                        		}

                   
                        }
                    }


                        days.push(<svg height="32" width="32"  className={day.type + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")} onClick={this.props.select.bind(null, day)}><line x1="-11" y1="16" x2="60" y2="16" style={{stroke: day.joincolor , strokeWidth:'2'}} /><circle fill={day.daycolor} cx="20" cy="16" r="15" /><text x="20" y="21"  textAnchor="middle" fontFamily="Verdana" fontSize="13" fill="white">{day.number}</text></svg>);
    
                        date = date.clone();
                        date.add(1, "d");
						
                    }
					
					return <div className="week" key={days[0].toString()}>
						{days}
					</div>;
				}
			});