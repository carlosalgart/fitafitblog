
import TagsDAO from './tags.dao';
import { CREATED, OK, NO_CONTENT } from 'http-status';

const tagsDao = new TagsDAO();

export async function list(request,h){
    const { params} = request;
    return await tagsDao.findAll();
}

export async function create(request, h){    
    const { payload, params: {postId} } = request;
    const tag = await tagsDao.create({...payload, postId});
    return h.response(tag).code(CREATED);
}

export async function detail(request, h){        
    const {id} = request.params;
    return await tagsDao.findById(id);
}

export async function update(request, h){
    const {payload,  params} = request;
    return await tagsDao.update(params, payload);
}

export async function destroy(request, h){
    const { params } = request;
    await tagsDao.destroy(params);
    return h.response().code(NO_CONTENT);
}