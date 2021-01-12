module.exports=(sequelize, DataTypes) =>{
    const Events= sequelize.define('events', {
        date:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{notEmpty:true}
        },
    
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
       location:{
            type:DataTypes.STRING,
            allowNull:true
        },    
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },  
      

        hours:{
            type:DataTypes.INTEGER,
            allowNull:true,
            validate:{notEmpty:true},
    
        }

        
    })
    return Events
}