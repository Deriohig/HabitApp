Table = FixedDataTable.Table;
Column = FixedDataTable.Column;
Cell = FixedDataTable.Cell;

TextCell =  React.createClass ({
 	 
 	render() {
	    const {rowIndex, field, data, ...props} = this.props;
	    console.log(data[rowIndex][field]);
    return (
	      <Cell {...this.props}>
	        {data[rowIndex][field]}
	      </Cell>
    );
  }
});

DateCell =  React.createClass ({
 	 
 	render() {
	    const {rowIndex, field, data, ...props} = this.props;
	     var dateCel = moment(data[rowIndex][field]).format("dddd, MMMM Do, h:mm:ss a");
    return (
	      <Cell {...this.props}>
	        {dateCel}
	      </Cell>
    );
  }
});

TableData = React.createClass({	

	render: function(){
				
	 var data = this.props.data;

	console.log(data);
	 
	function rowGetter(rowIndex) {
	  return data[rowIndex];
	}

				return(

						<Table

						    rowHeight={50}
						    rowsCount={data.length}
						    width={420}
						    height={270}
						    headerHeight={50}>
							<Column header={<Cell>Habit</Cell>} width={160} dataKey={1}  cell={<TextCell data={data} field='content' col="content"/>} />

						    <Column header={<Cell>Time</Cell>} width={260} dataKey={1}  cell={<DateCell data={data} field='start' col="start"/>} />
						   
						</Table>

					);
			}


});