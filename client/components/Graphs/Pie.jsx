PieChart = React.createClass({

	componentDidMount: function() {		
  		this.updateChart(this.props);
  	},
 
  	componentWillUpdate: function(nextProps) {  		
  		this.updateChart(nextProps);
  	},
 
	getDefaultProps: function() {
		return {
		  width: 160,
		  height: 200
		}
	},

	setClassName: function(value){
		
	},
 
    render: function() {

        return (

        	    <div className="Weekly" style={{width : '33.33%', display:'inline-block', margin:'auto' }}> </div>
        );
    },

updateChart: function(props) {

		function LightenDarkenColor(col, amt) {
				  
				    var usePound = false;
				  
				    if (col[0] == "#") {
				        col = col.slice(1);
				        usePound = true;
				    }
				 
				    var num = parseInt(col,16);
				 
				    var r = (num >> 16) + amt;
				 
				    if (r > 255) r = 255;
				    else if  (r < 0) r = 0;
				 
				    var b = ((num >> 8) & 0x00FF) + amt;
				 
				    if (b > 255) b = 255;
				    else if  (b < 0) b = 0;
				 
				    var g = (num & 0x0000FF) + amt;
				 
				    if (g > 255) g = 255;
				    else if (g < 0) g = 0;
				 
				    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
				  
					}

	    var data = props.data;
	    

	    var el = ReactDOM.findDOMNode(this);

	    if(el.firstChild){
	    el.removeChild(el.firstChild);
		};


		var lighter = LightenDarkenColor(props.color, 170);
		
	    var radius = Math.min(props.width, props.height) / 2;
 
	    var color = d3.scale.linear()
		    .domain([-1, 0, 1])
		    .range([lighter, props.color ,lighter]);

		var pie = d3.layout.pie()
		    .sort(null);

		var arc = d3.svg.arc()
		    .innerRadius(radius - 1)
		    .outerRadius(radius - 10);
		    
		var svg = d3.select(el).append("svg")
		    .attr("width", props.width)
		    .attr("height", props.height)
		    .append("g")
		    .attr("transform", "translate(" + props.width / 2 + "," + props.height / 2 + ")");


		var path = svg.selectAll("path")
		    .data(pie(data))
		  	.enter().append("path")
		    .attr("fill", function(d, i) { return color(i); })
		    .attr("d", arc)
		    svg.append("text")
		    .attr("text-anchor", "middle")
		    .text(props.title)
		    .attr("fill", props.color)
		    .attr("y","9px")
		    .style("font-size", "18px");
		    

	}
		

});