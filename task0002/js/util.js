/**
 * Created by lenovo on 2016/3/1.
 */
// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
function isArray(arr)
{
    return Object.prototype.toString.call(arr) === "[Object Array]";
}
// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn)
{
    return Object.prototype.toString.call(fn) === "[Object Function]";
}
// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
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
// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
function uniqArray(arr) {

}