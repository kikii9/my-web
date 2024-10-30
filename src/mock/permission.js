// 引入mockjs
// 假数据
import Mock from "mockjs";
import { options } from "../views/home/options";
import { menuList } from './menuList'
const Random = Mock.Random;


export const LoginInfo = (options) => {
  console.log(options, "接收post参数");
  const { username, password } = JSON.parse(options.body);
  if (username == "admin" && password != "123456") {
    return {
      code: "-200",
      data: {
        message: "用户不存在",
      },
    };
  } else {
    return {
      code: "200",
      data: {
        user_id: Random.id(),
        name: Random.cname(),
        token: Random.guid(),
        image:
          "https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660064400&t=6fe6057370cbe369654ff2e132d02a37",
      },
    };
  }
};


// 获取菜单列表
export const getMenuList = (options) => {
  const obj = JSON.parse(options.body);
  return {
    code: 200,
    data: {
      menuList: menuList,
    },
  };
};

// 用户列表
let userList = [];
for (let index = 0; index < 50; index++) {
  let obj = {
    id: Random.id(),
    username: Random.cname(),
    email: Random.email(),
    date: Random.date(),
    address: Random.city(true),
    content: Random.csentence(),
  };
  userList.push(obj);
}
const param2Obj = (url) => {
  let obj = JSON.parse(url);
  let page = obj.page;
  console.log(page);
  return page;
};

export const UserList = (options) => {
  const currentPage = param2Obj(options.body);
  let cameraData = userList.filter((item, index) => {
    return index >= (currentPage - 1) * 10 && index < currentPage * 10;
  });
  return {
    code: 200,
    data: {
      total: userList.length,
      userList: cameraData,
    },
  };
};

export const addUserList = (options) => {
  console.log("传过来的数据" + JSON.parse(options.body));
  let obj = JSON.parse(options.body);
  obj.id = Random.id();
  userList.unshift(obj); // 将前台返回来的数据，拼接到数组中。
  return {
    data: userList,
    id: obj.id,
  };
};

// 数据的修改操作
export const listUpdate = (options) => {
  let obj = JSON.parse(options.body);
  userList = userList.map((val) => {
    return val.id == obj.id ? obj : val;
  });
  return {
    data: userList,
  };
};

export const Newslist = (options) => {
  let obj = JSON.parse(options.body);
  let newList = [];
  for (let i = 0; i < 10; i++) {
    let item = {
      title: Random.csentence(5, 8), //  Random.csentence( min, max )
      notifyPic: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      notifyType: Random.integer(1, 3), //随机生成1-3的Integer
      isTop: Random.integer(1, 2), //随机生成1-2的Integer
      createUser: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      email: Random.email(),
      number: "$" + Random.integer(100, 5000) + ".00",
      createTime: Random.date() + " " + Random.time(),
      pay_state: "100" + Random.integer(1, 3),
    };
    newList.push(item);
  }
  return {
    data: newList,
  };
};
export const orderLists = (options) => {
  let obj = JSON.parse(options.body);
  let orderList = [];
  for (let i = 0; i < 60; i++) {
    let item = {
      goodsId: i,
      code: Random.guid(),
      title: Random.ctitle(4, 5),
      commodity: "10010" + i,
      goodsname: Random.cword(2, 6), //  Random.csentence( min, max )
      brand: Random.cword(2, 4),
      sku: "1ml", // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      inventory: Random.integer(10, 100),
      number: Random.integer(100, 5000), //100到5000的随机整数
      costPrice: Random.integer(10, 20),
      amount: Random.integer(100, 200), //100到5000的随机整数
      itemEdit: false,
      ItemData: [
        {
          address: Random.city(true),
          email: Random.email(),
          state: Random.boolean(),
          salenumber: Random.integer(10, 100),
          receivable: Random.integer(10, 100),
        },
      ],
    };
    orderList.push(item);
  }

  return {
    total: 60,
    data: obj.size == 10 ? orderList.slice(obj.size * obj.page - obj.size, obj.size * obj.page) : orderList,
  };
};

export const homeList = (options) => {
  let homeList = [];
  for (let index = 0; index < 10; index++) {
    let obj = {
      name: "限时秒杀",
      title_id: Random.integer(0, 10) + "id",
      type: Random.boolean(),
      number: Random.integer(10, 100),
      order_number: Random.integer(100, 1000),
      GWV_number: Random.integer(100, 5000),
      state: Random.boolean(),
    };
    homeList.push(obj);
  }

  return {
    data: homeList,
  };
};

export const noticeLists = (options) => {
  let noticeLists = [];
  for (let index = 0; index < 10; index++) {
    let item = {
      text: Random.csentence(),
    };
    noticeLists.push(item);
  }
  return {
    data: noticeLists,
  };
};

export const cardlists = (options) => {
  let obj = JSON.parse(options.body);
  let cardlists = [];
  for (let i = 0; i < 50; i++) {
    let item = {
      title: Random.csentence(5, 8), //  Random.csentence( min, max )
      user_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      email: Random.email(),
      number: "$" + Random.integer(100, 5000) + ".00",
      date: Random.date(),
      pay_state: "100" + Random.integer(1, 3),
      content: Random.csentence(),
    };
    cardlists.push(item);
  }
  return {
    data: cardlists,
  };
};
