BarCharty = React.createClass({
 
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
                           ['x', 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday'],
                          ["Positive", props.dataweek[0].posQty , props.dataweek[1].posQty, props.dataweek[2].posQty, props.dataweek[3].posQty,props.dataweek[4].posQty, props.dataweek[5].posQty, props.dataweek[6].posQty],
                          ['Negative', props.dataweek[0].negQty , props.dataweek[1].negQty, props.dataweek[2].negQty, props.dataweek[3].negQty,props.dataweek[4].negQty, props.dataweek[5].negQty, props.dataweek[6].negQty]
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