
import PostsDAO from './posts.dao';

const postsDao = new PostsDAO();

export async function list(request,h){
    return await postsDao.findAll();
}