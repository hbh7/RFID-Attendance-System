const User = require('./schemas/User');

module.exports.findAndCreate = async (card_id) => {
    let current_user = await User.findOne({cardID: card_id}).exec();
    if (current_user == null){
        user_model = new User({name:"", rin: null, cardID: card_id});
        user_model.save((err, usr) => {
            if(err) { console.log(err)}
            return usr;
        });
    }else{
        return current_user;
    }
}

module.exports.findAndEnroll = async (name, rin, card_id) => {
    let current_user = await User.findOne({cardID: card_id}).exec();
    if (current_user == null){
        current_user = new User({name: name, rin: rin, cardID: card_id});
    }else{
        current_user.name = name;
        current_user.rin = rin;
    }
    current_user.save((err, usr) => {
        if(err) { console.log(err)}
        return usr;
    })
}