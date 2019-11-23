 import { instances } from 'hapi-sequelizejs'

 const Post = instances.getModel('post');

 export default class PostsDAO{
    findAll(){
        return Post.findAll();
    }

 }