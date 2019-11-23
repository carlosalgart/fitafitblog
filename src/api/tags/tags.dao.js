import { instances } from 'hapi-sequelizejs';
import PostsDAO from '../posts/posts.dao';

const Tag = instances.getModel('Tag');

export default class TagsDAO{
   findAll(){
        return Tag.findAll({where});
   }

   findById(id){
        return Tag.findOne({where});
   }

   create( tag) {
       return Tag.create(tag);
    }

   async update(params, payload){
       await Tag.update(payload, {where: {params}});
       return await this.findById(params.id);
   }

   destroy(params){
       return Tag.destroy({where: {params}});
   }

}
