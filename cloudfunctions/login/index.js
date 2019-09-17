// 云函数入口文件
var cloud = require('wx-server-sdk')
var conn
cloud.init();
var db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  var data = event.data;

  // conn = event.conn
  // db = db.collection(event.conn);
  var o //= event
  // o= query(event.conn, event.data);
  var r = await query(data);
  o = { userName: r.data[0]};
  if (  r.data.length == 1) {
    return o;
  }else{
    return r.data.length;
  }
}

function insert(data) {
  return d
  try {
    return db.collection(conn).add({
      data: data
    })
  } catch (e) {
    console.log("新增操作出错");
  }
}

function query(data) {
  console.log(data)
  try {
    return db.collection('users').where({
      userID: cloud.getWXContext().OPENID
    }).get()
  } catch (e) {
    console.log("查询操作出错");
  }
}