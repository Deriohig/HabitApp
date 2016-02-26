    Accounts.onCreateUser(function(options,user) {
    user.profile = {};
    user.profile.health = 100;
    user.profile.level = 0;
    user.profile.experience = 0;
    user.profile.maxExp = 100;
    user.profile.currentExp = 0;
    user.profile.purchaseLog =  {reward:[ {obj: {title: "this", cost: 30} , time: new Date} , {obj:{ title: "this", cost: 30} , time: new Date } ]};
    user.profile.karma = 0;
    user.profile.actions = 0;
     //etc
     return user
});
