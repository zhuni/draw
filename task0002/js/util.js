/**
 * Created by lenovo on 2016/3/1.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr)
{
    return Object.prototype.toString.call(arr) === "[Object Array]";
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn)
{
    return Object.prototype.toString.call(fn) === "[Object Function]";
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject (src) {
    var copy;
   var type = typeof(src);
    if(type == "number"||type == "string"||type=="boolean")
    {
        copy = src;
    }
   if(src.constructor == Date)
   {
       copy = src;
   }
    if(src.constructor == Array)
    {
        copy = [];
        for(var i;i<src.length;i++)
        {
            copy[i]=src[i];
        }
    }
    if(src.constructor == Object)
    {
        copy= {};
        for (var x in src)
        {
            copy[x] = cloneObject(src[x]);
        }
    }
    return copy;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {

}