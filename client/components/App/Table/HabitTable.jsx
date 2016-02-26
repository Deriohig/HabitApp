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



		var thead = React.DOM.thead({},
            React.DOM.tr({},
                this.props.cols.map(function (col) {
                    return React.DOM.th({}, col);
            })));

        var tbody = this.props.rows.map(function (row) {
            return React.DOM.tr({},
            _self.props.cols.map(function (col) {
                return React.DOM.td({}, row[col] || "");
            }));
        });

        return React.DOM.table({}, [thead, tbody]);

		}
});