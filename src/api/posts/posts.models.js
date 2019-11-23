import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
    class Post extends Model{}
    Post.init({
    title: dataTypes.STRING,
    content: dataTypes.TEXT
    }, {sequelize, modelName: 'Post'})

    return Post;
};