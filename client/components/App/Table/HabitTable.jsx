var moment = require('moment');

 TableRow = React.createClass({

	render: function(){
		var exp = "15exp";
		console.log(this.props.habit);

		return(

				<tr style={{border:'1px solid grey'}}>
					<th>{this.props.habit.content}</th>
					<th>{this.props.habit.start}</th>
					<th>{exp}</th>
				</tr>

			)

	}
});

Table = React.createClass ({

	renderHabitTable() {
				console.log("execute");
			    return this.props.habits.map((habit) => {
			      return <TableRow key={habit._id} habit={habit} />;
			    }.bind(this));
			  },



	render: function(){
		console.log(this.props.habits);

			return(
					<table>
						<thead>
							<tr>
								<th>Habit</th>
								<th>Time</th>
								<th>Experience</th>
							</tr>
						</thead>
						<tbody>
							{this.renderHabitTable()}
						</tbody>
					</table>
				)


		}
});