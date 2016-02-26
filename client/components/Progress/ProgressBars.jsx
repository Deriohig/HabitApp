ProgressBars = React.createClass({


  mixins: [ReactMeteorData],
       
        // Loads items from the Tasks collection and puts them on this.data.tasks
        getMeteorData() {
          var currentUserId = Meteor.userId();
          return {
            MaxExp: Meteor.user().profile.maxExp,
            CurrentExp: Meteor.user().profile.currentExp,
            Health: Meteor.user().profile.health
          };
        },

    render: function(){

      var expValue = this.data.CurrentExp/this.data.MaxExp;
      var expPercent = expValue * 100;
      var healthVal = this.data.Health;

      var experience = {  height:'20px',
                          width: expPercent +'%',
                          backgroundColor:'#e0b72e',
                          color: '#2e2200'};  

        var health = {height:'20px',
                     width: healthVal +'%',
                     backgroundColor:'#e11c44',
                     color: '#2e2200' };


        function calculateNextLevel(level){

          var maxXP = 0.25 * Math.pow(level, 2) + 10 * 4 +139; 

          return maxXP
        };

        function LevelUp(level){
        var userid = Meteor.userId();
         console.log("levelUp");
         var lvlVal = level + 1;
         var max = calculateNextLevel(lvlVal);
         Meteor.users.update({ _id: userid}, { $set: {'profile.health': 100, 'profile.currentExp' : 0, 'profile.maxExp': max} , $inc: {"profile.level": 1} }); 

        };

        if (Meteor.user().profile.maxExp <= Meteor.user().profile.currentExp){
          console.log("trigger level up");
          LevelUp(Meteor.user().profile.level);
        }

      return(
              <div>
                  <div className="row" style={{marginLeft: '-2px'}}>
                  <div className="col-xs-12 clear-padding" style={{marginLeft: '5px'}} >
                   
                        <div className="col-md-12 clear-padding progress" style={{  height: '20px', margin:'0px'}}>
                            <div className="progress-bar" role="progressbar progress-bar-warning" style={experience} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                              <span className="icon-chart" style={{fontSize: '12px', float: 'left'}}> Experience </span>
                              <span > {this.data.CurrentExp} / {this.data.MaxExp}</span>
                            </div>
                        </div>
            
                    
                      <div className="col-md-12 clear-padding progress" style={ { height: '20px', margin:'0px'}}>
                          <div className="progress-bar" role="progressbar progress-bar-danger" style={health} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                            <span className="icon-heart" style={{fontSize: '12px', float: 'left'}}> Health </span>
                            <span >{healthVal} / 100 </span>
                          </div>
                      </div>
                    
                  </div>
              </div>

              </div>
        )
    }
});