
IndexLayout = React.createClass({
  render() {
    return (
  
    

  <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">

    {this.props.indexheader}

  
    <header className="intro">
        <div className="intro-body">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h1 className="brand-heading">Grayscale</h1>
                        <p className="intro-text">A Habit tracking application.</p>
                        <a href="#about" className="btn btn-circle page-scroll">
                            <i className="fa fa-angle-double-down animated"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section id="about" className="container content-section text-center">
        <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
                <h2>About Grayscale</h2>
                <p>Grayscale is a free Bootstrap 3 theme created by Start Bootstrap. It can be yours right now, simply download the template on the preview page. The theme is open source, and you can use it for any purpose, personal or commercial.</p>
                <p>This theme features stock photos by Gratisography along with a custom Google Maps skin courtesy of Snazzy Maps.</p>
                <p>Grayscale includes full HTML, CSS, and custom JavaScript files along with LESS files for easy customization.</p>
            </div>
        </div>
    </section>

     <section id="download" className="content-section text-center">
        <div className="download-section">
            <div className="container">
                <div className="col-lg-8 col-lg-offset-2">
                    <h2>Download Grayscale</h2>
                    <p>You can download Grayscale for free on the preview page at Start Bootstrap.</p>
                    <a href="http://startbootstrap.com/template-overviews/grayscale/" className="btn btn-default btn-lg">Visit Download Page</a>
                </div>
            </div>
        </div>
    </section>
    </body>   
     );
  }
});

MainLayout = React.createClass({
 
  render() {
    return (
  
    <div className="container-fluid ">
            <div className="col-xs-12 clear-padding">
                  {this.props.head}
                  {this.props.nav}
                  {this.props.content}                 
            </div>
    </div>
    );
  }
});

