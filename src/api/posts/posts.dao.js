 import { instances } from 'hapi-sequelizejs'

 const Post = instances.getModel('post');

 export default class PostsDAO{
    findAll(){
        return Post.findAll();
    }

    findById(id){
        return Post.findByPk(id);
    }

    create(data){
        return Post.create(data);
    }

    async update(id, post){
        await Post.update(post, {where: {id}});
        return await this.findById(id);
    }

    destroy(id){
        return Post.destroy({where: {id}});
    }

 }