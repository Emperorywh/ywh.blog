import Request from "@/utils/request";
/**
 * 个性签名 分页查询
 * @param data 
 * @returns 
 */
export function PersonalSignaturePageQuery(data: IBlogPersonSignal) {
    return Request.request({
        url: '/personalSignature/list',
        method: 'POST',
        data
    });
}

/**
 * 博客分类 分页查询请求参数
 */
export interface IBlogPersonSignal extends CommonTypes.PageQueryParams {
    content?: string
}