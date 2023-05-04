import Request from "@/utils/request";

/**
 * 查询关于我
 * @param data 
 * @returns 
 */
export function AboutFindOne() {
    return Request.request({
        url: '/about/findOne',
        method: 'POST'
    });
}
