
Nav  = React.createClass({
      render() {

      	var iconStyle = {fontSize :'24px'};
      	var fontstyle = {color: "#4d4647"};
        return (
        	<div  className=" col-xs-1 Nav-bar clear-padding">
	            <ul className="nav icons">
		            <li className="nav-list"><a href="/dashboard" style={fontstyle}><center><i className="icon-gauge" style={iconStyle} ></i></center> <center><span>Dashboard</span></center> </a></li>
		            <li className="nav-list" ><a href="/habit" style={fontstyle}><center><i className="icon-cc-by" style={iconStyle} ></i></center><center><span >Habits</span></center></a></li>
		            <li className="nav-list"><a href="/rewards" style={fontstyle}><center><i className="icon-award" style={iconStyle}></i></center><center><span>Rewards</span></center></a></li>
				</ul>
			</div>
			 )
} })