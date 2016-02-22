BarChartx = React.createClass({
 
	componentDidMount: function() {		
  		  		
  		this.updateChart(this.props);
  	},

    updateChart: function(props) {

      console.log(props);
      

      chart=  c3.generate({

        bindto: ReactDOM.findDOMNode(this),
                  size: {
                          height: 350
                        },
                  padding: {
                              right: 50
                            },
                  data: {

                        colors:{

                        Positive: "#5dba47",
                        Negative: "#db4258"

                      },

                        x:'x',

                      columns: [
                           ['x', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                          ["Positive", props.datamonth[0].posQty , props.datamonth[1].posQty, props.datamonth[2].posQty, props.datamonth[3].posQty,props.datamonth[4].posQty, props.datamonth[5].posQty, props.datamonth[6].posQty,  props.datamonth[7].posQty , props.datamonth[8].posQty,  props.datamonth[9].posQty,  props.datamonth[10].posQty,  props.datamonth[11].posQty],
                          ['Negative', props.datamonth[0].negQty , props.datamonth[1].negQty, props.datamonth[2].negQty, props.datamonth[3].negQty,props.datamonth[4].negQty, props.datamonth[5].negQty, props.datamonth[6].negQty,props.datamonth[7].negQty, props.datamonth[7].negQty, props.datamonth[9].negQty,props.datamonth[10].negQty,props.datamonth[11].negQty]
                      ],
                      
                      type: props.graphType,
                  },
                  axis: {
                        x: {
                            type: 'category' // this needed to load string x value
                        }
                    },

                  bar: {
                      height: '600px'
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
        	<div className="chart"></div>            
        );
    }
});