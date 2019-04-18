const User = require('./schemas/User');

module.exports.findAndCreate = async function(card_id) {
    let current_user = await User.findOne({cardID: card_id}).exec();
    if (current_user == null){
        user_model = new User({name:"", rin: null, cardID: card_id});
        user_model.save((err, usr) => {
            return usr;
        });
    }else{
        return current_user;
    }
}