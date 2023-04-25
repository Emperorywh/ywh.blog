import Request from "@/utils/request";

/**
 * 友情链接 分页查询
 * @param data 
 * @returns 
 */
export function FriendlyLinkPageQuery(data: IFriendlyLinkPage) {
    return Request.request({
        url: '/friendlyLink/list',
        method: 'POST',
        data
    });
}

/**
 * 创建友情链接
 * @param data 
 * @returns 
 */
export function FriendlyLinkCreate(data: IFriendlyLink) {
    return Request.request({
        url: '/friendlyLink/create',
        method: 'POST',
        data
    });
}

/**
 * 友情链接
 */
export interface IFriendlyLink {
    _id?: string,
    name: string,
    url: string,
    cover: string,
    desc: string,
    createAt?: number,
    updateAt?: number,
    status: number,
    sort?: number,
    remark?: string
}

/**
 * 友情链接 分页查询
 */
export interface IFriendlyLinkPage extends CommonTypes.PageQueryParams {
    name?: string
}