import Request from "@/utils/request";
/**
 * 博客分类 分页查询
 * @param data 
 * @returns 
 */
export function BlogClassifyPageQuery(data: IBlogClassifyPage) {
    return Request.request({
        url: '/blogClassify/list',
        method: 'POST',
        data
    });
}

/**
 * 博客分类 分页查询请求参数
 */
export interface IBlogClassifyPage extends CommonTypes.PageQueryParams {
    name?: string
}

/**
 * 博客分类
 */
export interface IClassifycation {
    _id: string,
    name: string,
    status: number,
    createAt: number,
    updateAt: number,
    sort: number
}