
/**
 * 用户 数据类型
 */
export interface IUser {
    _id: string,
    username: string,
    nickname: string,
    phone: string,
    createAt: number,
    updateAt: number,
    avatarUrl: string,
    openId: string,
    status: number,
    persionalProfile: string
}