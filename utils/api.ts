import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: process.env.NODE_APP_API_URL || '',
  timeout: Number(process.env.NODE_APP_TIMEOUT_LIMIT) || 15000,
  headers: {
    authorization: '',
    'content-type': 'application/json',
    'Accept-Language': 'zh-tw'
  }
}

const axiosInstance: AxiosInstance = axios.create({
  ...config
})

const elephantSqlAuthKey: string = Buffer.from(`:${process.env.NODE_APP_ELEPHANTSQL_API_KEY}`).toString('base64')

const configElephantSql: AxiosRequestConfig = {
  baseURL: 'https://customer.elephantsql.com/api',
  timeout: Number(process.env.NODE_APP_TIMEOUT_LIMIT) || 15000,
  headers: {
    Authorization: `Basic ${elephantSqlAuthKey}`,
    'content-type': 'application/json'
  }
}

export const axiosInstanceElephantSql: AxiosInstance = axios.create({
  ...configElephantSql
})

export default axiosInstance
