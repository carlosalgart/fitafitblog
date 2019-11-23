import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
    class Tag extends Model{}
    Tag.init({                          
            name: dataTypes.STRING,  
            postId: dataTypes.INTEGER        
    }, {sequelize, modelName: 'Tag'});

    return Tag;
};