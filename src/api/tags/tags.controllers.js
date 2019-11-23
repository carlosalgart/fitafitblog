
import TagsDAO from './tags.dao';
import { CREATED, OK, NO_CONTENT } from 'http-status';

const tagsDao = new TagsDAO();

export async function list(request,h){
    return await tagsDao.findAll();
}

export async function create(request, h){    
    const { payload} = request;
    const tag = await tagsDao.create(payload);
    return h.response(tag).code(CREATED);
}

export async function detail(request, h){        
    const {id} = request.params;
    return await tagsDao.findById(id);
}

export async function update(request, h){
    const {payload,  params: {id}} = request;
    return await tagsDao.update(params.id, payload);
}

export async function destroy(request, h){
    const {id} = request.params;
    return await tagsDao.destroy(id);
}