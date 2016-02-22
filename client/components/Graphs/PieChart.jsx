Pie = React.createClass({
 
	componentDidMount: function() {		
  		  		
  		this.updateChart(this.props);
  	},

    updateChart: function(props) {

          var chart = c3.generate({
            bindto: ReactDOM.findDOMNode(this),
              data: {
                  
                  columns: [
                      ['data1', 30],
                      ['data2', 120],
                  ],
                  type : 'donut'
                  
              },
              donut: {
                  title: "Iris Petal Width"
              }
          });

  },
 
  	componentWillUpdate: function(nextProps) {  		
  		this.updateChart(nextProps);
  	},
 
	getDefaultProps: function() {
		return {
		  width: 640,
		  height: 480
		}
	},
 
    render: function() {
        return (
        	<div className="Pie"></div>            
        );
    }
});