import Request from "@/utils/request";

/**
 * 分页查询博客列表
 * @param data 
 * @returns 
 */
export function BlogPageQuery(data: IBlogPage) {
    return Request.request({
        url: '/blog/list',
        method: 'POST',
        data
    });
}

/**
 * 博客 分页查询请求参数
 */
export interface IBlogPage extends CommonTypes.PageQueryParams {
    title?: string;
    classification?: string,
    label?: string[]
}