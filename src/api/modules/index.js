//src/api/user/index.js

import service from "../request.js";

export function LoginInfo(query) {
  return service({
    method: "POST",
    url: "/permission/LoginInfo",
    data: query,
  });
}
export function getMenuList(query) {
  return service({
    method: "get",
    url: "/permission/getMenuList",
    data: query,
  });
}

export function getUserList(query) {
  return service({
    method: "get",
    url: "/permission/UserList",
    data: query,
  });
}
export function addUserList(query) {
  return service({
    method: "post",
    url: "/permission/addUserList",
    data: query,
  });
}
export function listUpdate(query) {
  return service({
    method: "post",
    url: "/permission/listUpdate",
    data: query,
  });
}
export function Newslist(query) {
  return service({
    method: "get",
    url: "/permission/Newslist",
    data: query,
  });
}
export function orderLists(query) {
  return service({
    method: "get",
    url: "/permission/orderLists",
    data: query,
  });
}
export function homeList(query) {
  return service({
    method: "get",
    url: "/permission/homeList",
    data: query,
  });
}
export function noticeLists(query) {
  return service({
    method: "get",
    url: "/permission/noticeLists",
    data: query,
  });
}
export function cardlists(query) {
  return service({
    method: "get",
    url: "/permission/cardlists",
    data: query,
  });
}