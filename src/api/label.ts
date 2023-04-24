import Request from "@/utils/request";

/**
 * 博客标签 分页查询
 * @param data 
 * @returns 
 */
export function BlogLabelPageQuery(data: IBlogLabelPage) {
    return Request.request({
        url: '/blogLabel/list',
        method: 'POST',
        data
    });
}

/**
 * 博客标签 分页查询请求参数
 */
export interface IBlogLabelPage extends CommonTypes.PageQueryParams {
    name?: string
}

/**
 * 博客标签
 */
export interface ILabel {
    _id: string,
    name: string,
    status: number,
    createAt: number,
    updateAt: number,
    sort: number
}