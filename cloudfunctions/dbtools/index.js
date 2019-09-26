// 云函数入口文件
var cloud = require('wx-server-sdk')
var conn
cloud.init();
var db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  var data = event.data;
  conn = event.conn
  // db = db.collection(event.conn);
  var o = event
  // o= query(event.conn, event.data);

  switch (event.type) {
    case 'insert':
      // if (data != "")
      var ins = await insert(data);
      var que = await query("");

      o = {
        insert: ins._id,
        data: que.data
      };

      // o = "选择了insert分支";
      break;
    case 'remove':
      if (data != "")
        o =await remove(data);
      // o = "选择了remove分支";
      break;
    case 'update':
      if (data != "")
        o =await update(data);
      // o = "选择了update分支";
      break;
    case 'query':
      o =await query(data);
      // o = "选择了query分支";
      break;
    default:
  }
  return o
}

function insert(data) {
  try {
    return db.collection(conn).add({
      data: data
    })
  } catch (e) {
    console.log("新增操作出错");
  }
}

function remove(data) {
  try {
    db.collection(conn).doc(data).remove()
    return db.collection(conn).where().orderBy('createDate', 'asc').get()
  } catch (e) {
    console.log("删除操作出错");
  }
}

function update(data) {
  // return 'update()'
  var index = data._id;
  delete data._id;
  try {
    db.collection(conn).where({
        _id: index
      })
      .update({
        data: data
      })
    return db.collection(conn).where().get()
  } catch (e) {
    console.log("修改操作出错");
  }
}

function query(data) {
  try {
    return db.collection(conn).where(data).get()
  } catch (e) {
    console.log("查询操作出错");
  }
}