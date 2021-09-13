<?php
// 500 服务器错误
// header('HTTP/1.1 500 Internal Server Error');
// 响应结果
echo json_encode([
  "status" => 1,
  "msg" => 'hello,itcast'
]);