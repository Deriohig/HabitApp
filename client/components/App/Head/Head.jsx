Head  = React.createClass({
	mixins: [ ReactMeteorData ],

getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      hasUser: !!Meteor.user(),
      isPublic( route ) {
        let publicRoutes = [
          'login'
        ];

        return publicRoutes.indexOf( route ) > -1;
      },
      canView() {
        return this.isPublic( FlowRouter.current().route.name ) || !!Meteor.user();
      }
    };
  },
  getInitialState: function()
    {
        return {
            isOpen: false
        };
    },

  toggleMenu: function(e)
    {
        e.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    },

      render() {

      	if(!Meteor.user()){
      	 window.location.replace("localhost:3000")
      	};

      		var iconStyle = {fontSize :'26px', color:'#e46e50' , paddingLeft: '20px', paddingRight: '20px', paddingTop: '12px'};

        return (
        	<div className="header-all">  
          	<div className="col-xs-1 left-header clear-padding"></div>
           
          	<div className="col-xs-10 header-main">  <span style={{paddingTop:10}} className=" col-md-4 user-info pull-right"> <AccountsUIWrapper/> <ProgressBars/> </span> </div>
            <DropMenu />  
			    </div>
			 )
} });