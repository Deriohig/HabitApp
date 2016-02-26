DropMenu = React.createClass({
    getDefaultProps: function()
    {
        return {
            isOpen: false
        };
    },

    render: function()

   
    {
         var style = { position: 'absoloute', float: "right"};
         var iconStyle = {fontSize :'26px', color:'#e46e50' , paddingLeft: '20px', paddingRight: '23px'};
       
    
            return (
               

                <div className="col-xs-1 message-box">
                          
                    <nav>
                        <ul>
                            <li><a href="#">
                                    <div style={iconStyle}>
                                         <i className="icon-cog-1" ></i>
                                     </div> 
                                </a>
                                <ul>
                                    <li><a href="#">Exchange</a></li>
                                    <li><AccountsUIWrapper/></li>
                                </ul>        
                            </li>
                            
                        </ul>
                    </nav>

                </div>
            )
        
       
    }
});