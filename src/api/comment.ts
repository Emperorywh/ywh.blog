import Request from "@/utils/request";

/**
 * 创建评论
 * @param data 
 * @returns 
 */
export function CommentCreate(data: IComment) {
    return Request.request({
        url: '/comment/create',
        method: 'POST',
        data
    });
}

/**
 * 根据博客ID 查询评论列表
 * @param data 
 * @returns 
 */
export function CommentListByBlogId(blogId: string) {
    return Request.request({
        url: '/comment/list',
        method: 'POST',
        data: {
            blogId
        }
    });
}

/**
 * 留言板列表
 * @param data 
 * @returns 
 */
export function CommentListByMessage() {
    return Request.request({
        url: '/comment/message',
        method: 'POST'
    });
}


/**
 * 关于我留言板列表
 * @param data 
 * @returns 
 */
export function CommentListByAboutMessage() {
    return Request.request({
        url: '/comment/aboutMessage',
        method: 'POST'
    });
}

/**
 * 评论实体类
 */
export interface IComment {
    _id?: string;
    blogId?: string;
    parent?: IComment | string;
    from: string;
    to?: IComment | string;
    email: string;
    content: string;
    avatarUrl?: string;
    createAt?: number;
    showCommentForm?: boolean;
    children?: IComment[];
    commentType: number;
}