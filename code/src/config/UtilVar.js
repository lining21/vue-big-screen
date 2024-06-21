const UtilVar = {
    ENC: false, //返回结果是否加密
    baseUrl: `http://locolhost:8888`,
    code: 401,
}
const runtimeType = {

    production: () => {
    },
    yh:()=>{

    },
    //开发环境
    development: () => {
      
    },
    
}
runtimeType[process.env.VUE_APP_URL_ENV]()
export default UtilVar

