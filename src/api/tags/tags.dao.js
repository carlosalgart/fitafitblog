import { instances } from 'hapi-sequelizejs'

const Tag = instances.getModel('Tag');

export default class TagsDAO{
   findAll(){
       return Tag.findAll();
   }

   findById(id){
        return Tag.findOne({where: {postId: idPost, id: idTag}});
   }

   async create(idPost, tag) {
    const post = await PostsDAO.findById(idPost);
    
    if (! post) {
        return {}
    }

    const tagNew = await Tag.create(tag);
    tagNew.setPost(post);

    return tagNew;
    }

   async update(id, tag){
       await Tag.update(tag, {where: {id}});
       return await this.findById(id);
   }

   destroy(id){
       return Tag.destroy({where: {id}});
   }

}
