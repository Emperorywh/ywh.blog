import axios, { AxiosError, type AxiosResponse } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElNotification } from 'element-plus';
/**
 * 后端返回的数据格式
 */
interface ResponseResult {
    code: number;
    data: any;
    message: string;
}

export class Request {
    //axios实例
    axiosInstance: AxiosInstance;
    //基础配置：url和超时时间
    baseConfig: AxiosRequestConfig = {
        baseURL: '/apis',
        timeout: 80000
    };

    constructor(config: AxiosRequestConfig) {
        // 使用axios.create创建axios实例
        this.axiosInstance = axios.create(Object.assign(this.baseConfig, config));
        this.axiosInstance.interceptors.request.use(
            reqConfig => {
                const token = localStorage.getItem('USER_TOKEN');
                if (token) {
                    reqConfig.headers!.Authorization = token;
                }
                return reqConfig;
            },
            error => Promise.reject(error)
        );
        this.axiosInstance.interceptors.response.use(
            (res): AxiosResponse<ResponseResult> => {
                return res
            },
            (error: AxiosError) => {
                switch (error.response?.status) {
                    case 400:
                        ElNotification({
                            title: '400',
                            message: "请求错误！",
                        })
                        break;
                    case 401:
                        ElNotification({
                            title: '401',
                            message: "未授权，请重新登录(401)！",
                        })
                        break;
                    case 403:
                        ElNotification({
                            title: '403',
                            message: "拒绝访问！",
                        })
                        break;
                    case 404:
                        ElNotification({
                            title: '404',
                            message: "请求资源未找到！",
                        })
                        break;
                    case 408:
                        ElNotification({
                            title: '408',
                            message: "请求超时！",
                        })
                        break;
                    case 500:
                        ElNotification({
                            title: '500',
                            message: "服务器内部错误！",
                        })
                        break;
                    case 501:
                        ElNotification({
                            title: '501',
                            message: "服务未实现",
                        })
                        break;
                    case 502:
                        ElNotification({
                            title: '502',
                            message: "网络错误",
                        })
                        break;
                    case 503:
                        ElNotification({
                            title: '503',
                            message: "服务不可用",
                        })
                        break;
                    case 504:
                        ElNotification({
                            title: '503',
                            message: "网络超时",
                        })
                        break;
                    default:
                        ElNotification({
                            title: error.response!.status + "",
                            message: error.message,
                        })
                        break;
                }
                return Promise.reject(error.response)
            }
        );
    }

    // 定义请求方法
    public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.axiosInstance.request(config);
    }
}

export default new Request({});