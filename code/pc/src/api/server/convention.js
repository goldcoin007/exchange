/**
 * axios的惯例配置
 *
 * @author lautin
 * @created 2019-11-21 21:18:25
 */

// import Qs from 'qs';
import http from 'http';
import https from 'https';

// 这些是用于发出请求的可用配置选项。其中url为必选项，method默认值为GET
const config = {
    // url是相对于服务器根地址的路径
    url: '',

    method: 'get', // default

    // baseURL将被前缀为url，除非url是绝对的。
    // 将baseURL设置为传递相对url的axios实例是很方便的
    baseURL: '',

    // `transformRequest`允许在请求数据发送到服务器之前对其进行修改
    // 这只适用于请求方法`PUT POST PATCH 和 DELETE `
    // 数组中的最后一个函数必须返回一个!!字符串!!或Buffer的一个实例ArrayBuffer，
    // FormData或Stream 你可以修改headers对象。
    // transformRequest: [function (data, headers) {
    //     // 此处写下你想如何转化数据
    //     return data;
    // }],

    // `transformResponse`允许更改之前的响应数据 它被传递到then/catch
    transformResponse: [function (data) {
        // 此处写下你想如何转化数据

        return data;
        
    }],

    // 要发送的自定义头
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },

    // 'params'是与请求一起发送的URL参数 必须是一个普通对象或URLSearchParams对象
    params: {
        // ID: 12345
    },

    // 一个可选函数，负责序列化params，将对象转化为urlencode数据
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params, {
    //         arrayFormat: 'brackets'
    //     })
    // },

    // data是作为请求体发送的数据 只适用于请求方法`PUT POST 和 PATCH`
    // 当没有设置transformRequest时，必须是以下类型之一:
    // -字符串，普通对象，ArrayBuffer，ArrayBufferView，URLSearchParams
    // -只支持浏览器FormData, File, Blob
    // -只有节点:流，缓冲区
    data: {

    },

    // 指定请求超时之前的毫秒数。如果请求花费的时间超过timeout将被中止。
    timeout: 10, // default is `0` (no timeout)

    //表示有跨站点访问控制请求时应该使用凭证
    withCredentials: false, // default

    // adapter允许自定义处理请求，这使得测试更加容易。
    // 返回一个Promise并提供一个有效的响应(参见lib/adapter/README.md)。
    // adapter: function (config) {
    //     /* ... */
    // },

    // auth表示应该使用`HTTP Basic auth`，并提供凭据。
    // 这将设置一个"授权"标题，覆盖任何现有的
    // '授权'自定义标头，你已经设置使用'标头'。
    // 请注意，只有HTTP基本认证是可配置的通过这个参数。
    // 对于不记名令牌等，使用"授权"自定义标头代替。
    // auth: {
    //     username: 'janedoe',
    //     password: 's00pers3cret'
    // },

    // 服务器响应的数据类型 选项有:
    //'arraybuffer'， 'document'， 'json'， 'text'， 'stream'
    // 只支持浏览器:"blob"
    responseType: 'json', // default
    
    // 用于解码响应的编码
    // 注意:对于'stream'或客户端请求的'responseType'被忽略
    responseEncoding: 'utf8', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // ' onUploadProgress '允许处理上传的进程事件
    onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },

    // ' onDownloadProgress '允许处理下载的进度事件
    onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },

    // 定义http响应内容的最大字节数
    maxContentLength: 2000,

    // `validateStatus` defines whether to resolve or reject the promise for a given  HTTP response status code.
    // If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved;
    // otherwise, the promise will be rejected.
    validateStatus: function (status) {
        // 返回2开头的状态码才进入resolve 否则都按rejected处理
        return status >= 200 && status < 300; // default
    },

    // 定义在node.js中跟随的最大重定向数。
    // 如果设置为0，则不会遵循重定向。
    maxRedirects: 5, // default

    // `socketPath` defines a UNIX Socket to be used in node.js.
    // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
    // Only either `socketPath` or `proxy` can be specified.
    // If both are specified, `socketPath` is used.
    socketPath: null, // default

    // `httpAgent` and `httpsAgent` define a custom agent（定制代理） to be used when performing（体现） http and https requests, respectively（独立）, in node.js. This allows options to be added like `keepAlive` that are not enabled by default.
    httpAgent: new http.Agent({
        keepAlive: true
    }),
    
    httpsAgent: new https.Agent({
        keepAlive: true
    }),

    // 'proxy' defines the hostname and port of the proxy server.
    // You can also define your proxy using the conventional `http_proxy` and
    // `https_proxy` environment variables. If you are using environment variables
    // for your proxy configuration, you can also define a `no_proxy` environment
    // variable as a comma-separated list of domains that should not be proxied.
    // Use `false` to disable proxies, ignoring environment variables.
    // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
    // supplies credentials.
    // This will set an `Proxy-Authorization` header, overwriting any existing
    // `Proxy-Authorization` custom headers you have set using `headers`.
    // proxy: {
    // host: '127.0.0.1',
    // port: 9000,
    // auth: {
    //     username: 'mikeymike',
    //     password: 'rapunz3l'
    // }
    // },

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    // cancelToken: new CancelToken(function (cancel) {})
}
export default config;
