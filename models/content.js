module.exports = function (sequelize , DataTypes){
  var contents = sequelize.define("contents" , {
    contentId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    contentType:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'COMMENT'
    },
    contentImage:{
      type: DataTypes.STRING
    },
    contentTitle: {
      type: DataTypes.STRING
    },
    contentText: {
      type: DataTypes.TEXT
    },
    liveFrom:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
      },
    liveUntil:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW},
    live:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false},
    upvote:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0},
    downvote:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0},
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW},	
    createdAt:{
      type: DataTypes.DATE}
       
    });
    
  return contents;
}



