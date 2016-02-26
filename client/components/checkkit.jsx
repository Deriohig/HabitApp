

MainLayout = React.createClass({


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
  loading() {
    return <div className="loading"></div>;
  },
  getView() {
    return this.data.canView() ? this.props.yield : <Login />;
  }, 

  renderingLayouts(){
   
        
  },

  render() {

    if(Meteor.hasUser == false){
        window.location.replace("http://localhost:3000/");
    }
    console.log(this.props.sendhome);
if(!this.data.hasUser){
    return (
  
    <div className="container-fluid app-root">
            <div className="col-xs-12 clear-padding">
                  {this.props.sendhome}                
            </div>
    </div>
    );
  }
  else if(this.props.indexheader){

    <div className="container-fluid app-root">
            <div className="col-xs-12 clear-padding">
                  {this.props.indexheader}                
            </div>
    </div>
  }
  else{
    return (
  
    <div className="container-fluid app-root">
            <div className="col-xs-12 clear-padding">
                  {this.props.head}
                  {this.props.nav}
                  {this.props.content}                 
            </div>
    </div>
    )
  }
}
});

