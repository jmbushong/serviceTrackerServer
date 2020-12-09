module.exports=(sequelize, DataTypes) =>{
    const Events= sequelize.define('events', {
        date:{
            type:DataTypes.DATE,
            allowNull: false,
            validate:{notEmpty:true}
        },
        typeOfService:{
            type:DataTypes.STRING,
            allowNull:false,
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
        time:{
            type:DataTypes.STRING,
            allowNull:true
        },

        hours:{
            type:DataTypes.INTEGER,
            allowNull:true,
            validate:{notEmpty:true},
    
        }

        
    })
    return Events
}