
import PostsDAO from './posts.dao';
import { CREATED, OK, NO_CONTENT } from 'http-status';

const postsDao = new PostsDAO();

export async function list(request,h){
    return await postsDao.findAll();
}

export async function create(request, h){
    const {payload} = request;
    const post = await postsDao.create(payload);
    return h.response(post).code(CREATED);
}

export async function detail(request, h){        
    const {id} = request.params;
    return await postsDao.findById(id);
}

export async function update(request, h){
    const {payload,  params: {id}} = request;
    return await postsDao.update(params.id, payload);
}

export async function destroy(request, h){
    const {id} = request.params;
    return await postsDao.destroy(id);
}