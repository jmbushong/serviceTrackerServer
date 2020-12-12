module.exports=(sequelize, DataTypes) =>{
    const Teacher= sequelize.define('teacherUser', {
        firstName:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{notEmpty:true}
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{notEmpty:true}
        },
        email:{
            type:DataTypes.STRING,
            validate:{isEmail:true},
            unique:true,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{notEmpty:true},
            //Password expression. Password must be between 4 and 8 digits long and include at least one numeric digit.
        },
        classId:{
            type:DataTypes.INTEGER,
            primaryKey: true
        }



        
    })
    return Teacher
}