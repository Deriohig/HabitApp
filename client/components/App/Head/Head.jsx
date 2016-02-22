Head  = React.createClass({

      render() {

      		var iconStyle = {fontSize :'26px', color:'#e46e50' , paddingLeft: '20px', paddingRight: '20px', paddingTop: '12px'};

        return (
        	<div className="header-all">  
        	<div className="col-xs-1 left-header clear-padding">Things</div>
        	<div className="col-xs-10 header-main">  <span className="user-info"><AccountsUIWrapper/> </span></div>
        	<div className="col-xs-1 message-box"><div  style={iconStyle}><i className="icon-cog-1" ></i></div></div>   	
			</div>
			 )
} });