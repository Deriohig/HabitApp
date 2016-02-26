
IndexLayout = React.createClass({

    mixins: [ReactMeteorData],
       
        // Loads items from the Tasks collection and puts them on this.data.tasks
        getMeteorData() {
          var currentUserId = Meteor.userId();
          return {
            
            currentUser: Meteor.user()
          };
        },


	render(){



		return(
					<div>
                            <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          
          <a className="navbar-brand" href="#">Project name</a>

        </div>
        <div className="pull-right" > { this.data.currentUser ? <a href="/dashboard" > <span>Dashboard</span></a> :'' }  </div>
        <div id="navbar" className="navbar-collapse collapse">
          <AccountsUIWrapper/>
        </div>

      </div>

    </nav>

   
    <div className="jumbotron">
      <div className="container-fluid">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
      </div>
    </div>

    <div className="container-fluid">

      <div className="row">
        <div className="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div className="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
       </div>
        <div className="col-md-4">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
      </div>

      <hr/>

      <footer>
        <p>&copy; 2015 Company, Inc.</p>
      </footer>
    </div>
        </div>
                   

			)
	}


});
