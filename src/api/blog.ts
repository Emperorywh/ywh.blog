import Request from "@/utils/request";
import type { IClassifycation } from '@/api/classification';
import type { ILabel } from '@/api/label';
import type { IUser } from '@/api/user';

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

/**
 * 博客 数据类型
 */
export interface IBlog {
    _id: string;
    author: IUser,
    title: string,
    abstract: string,
    content: string,
    classification: IClassifycation,
    label: Array<ILabel>,
    cover: string,
    createAt: number,
    updateAt: number,
    status: number,
    likeNumber: number,
    commentNumber: number,
    readNumber: number
}