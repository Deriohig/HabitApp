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

objCell =  React.createClass ({
 	 
 	render() {
	    const {rowIndex, field, data, ...props} = this.props;
	     var objCel = data[rowIndex].obj[field];
	     console.log(data);
    return (
	      <Cell {...this.props}>
	        {objCel}
	      </Cell>
    );
  }
});

RewardsTableData = React.createClass({	

	render: function(){
				
	 var data = this.props.data.reward;

	
	 
	function rowGetter(rowIndex) {
	  return data[rowIndex];
	}

				return(
						<div>
							<h3> Rewards Purchase History</h3>

							<Table

							    rowHeight={50}
							    rowsCount={data.length}
							    width={750}
							    height={270}
							    headerHeight={50}>
								<Column header={<Cell>Rewards</Cell>} width={250} cell={<objCell data={data} field='title' col="title"/>} />
							    <Column header={<Cell>Cost</Cell>} width={250} cell={<objCell data={data} field='cost' col="cost"/>} />
							    <Column header={<Cell>Time</Cell>} width={250} cell={<DateCell data={data} field='time' col="time"/>} />
							   
							</Table>

						</div>
					);
			}


});