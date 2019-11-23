class Post extends Model{}
Post.init({
title: DataTypes.STRING,
content: DataTypes.TEXT
}, {sequelize, modelName: 'post'})