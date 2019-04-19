const User = require('./schemas/User');

module.exports.findAndCreate = async (card_id) => {
    let current_user = await User.findOne({cardID: card_id}).exec();
    if (current_user == null){
        user_model = new User({name:"", rin: null, cardID: card_id});
        user_model.save((err, usr) => {
            console.log(err);
            return usr;
        });
    }else{
        return current_user;
    }
}