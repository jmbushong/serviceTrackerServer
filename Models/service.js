module.exports=(sequelize, DataTypes) =>{
    const Service= sequelize.define('service', {
        date:{
            type:DataTypes.STRING,
            // allowNull: false,
            // validate:{notEmpty:true}
        },
        typeOfService:{
            type:DataTypes.STRING,
            // allowNull:false,
            // validate:{notEmpty:true}
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        hours:{
            type:DataTypes.INTEGER,
            // allowNull:false,
            // validate:{notEmpty:true},
    
        },
       

        status:{
            type:DataTypes.STRING,
            allowNull:true
        }

        
    })
    return Service
}