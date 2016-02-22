Graph = React.createClass({
  getDefaultProps: function () {
    return {
        graph: {},
        style:{width:"100%",height:"100%"}
    };
  },

  getInitialState:function(){
    return {
      
    };
  },

  render: function() {
    return React.createElement("div", { id: "this", style: this.props.style});
  },

  changeMode:function(event) {
    this.updateGraph();

  },

  componentDidMount: function (){
    this.updateGraph();
  },

  componentDidUpdate: function (){
    this.updateGraph();

  },

  updateGraph:function(){

    // Container

    var container = document.getElementById("this");
    var div = document.getElementById('this');

    if(div.firstChild){
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
      };
     var maximum = moment().add(1, 'h');
    // Option s
    var options = {
      
      max: maximum,
      zoomMin:3600000,
      zoomMAx:8640000,
      height: '200px',
      stabilize: false,
      smoothCurves: false,
      edges: {
        color: '#000000',
        width: 0.5,
        arrowScaleFactor:0.5,
        style:"arrow"
      }

    };
    

    var Timeline = new vis.Timeline(container, this.props.graph, options);
  }



});