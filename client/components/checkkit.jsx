

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
    
    console.log(this.data.hasUser);
if(!this.data.hasUser){
  console.log(this.props.indexheader);
    return (
  
    <div className="container-fluid app-root">
            <div className="col-xs-12 clear-padding">
                  {this.props.sendhome}     
                  {this.props.indexheader}                
            </div>
    </div>
    );
  }

  else if(this.props.indexheader != undefined){
    console.log(this.props.indexheader);

    return(

      <div className="container-fluid app-root">
              <div className="col-xs-12 clear-padding">
                    {this.props.indexheader}                
              </div>
      </div>
    )
  }
  else{
    console.log(this.props.indexheader);
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

