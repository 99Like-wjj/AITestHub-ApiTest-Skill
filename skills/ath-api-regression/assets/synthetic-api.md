# 合成接口说明：查询订单

本文件仅为Skill原生内容示例。所有标识与数据均为合成；`https://api.example.invalid`是文档保留地址，不是可连接环境。本示例没有真实运行结果。

## 请求

- 服务名称：orders。实际base URL从用户选中的平台环境`baseUrls.orders`取得；文档示意`https://api.example.invalid`。
- 方法和路径：`GET /orders/{orderId}`。
- 路径参数`orderId`：必填非空字符串。示例用例固定`demo-order-001`。
- query、请求体：无。Accept为`application/json`。
- 认证：本合成接口不要求认证；真实项目如需认证，引用平台已有用途/认证绑定，不沿用本示例。
- 单请求超时：5000ms。

## 返回与业务预期

已知存在的订单查询成功时返回HTTP200；JSON正文至少包含id与state。id必须等于本次请求的orderId；本例订单状态固定为`created`。不能只凭HTTP200判断业务通过。

示例响应：

```json
{ "id": "demo-order-001", "state": "created" }
```

## 用例范围和数据

本例只覆盖已知订单的只读查询，不生成不存在订单等未给预期的分支。前提为所选测试环境已有上述合成订单。请求不创建数据，无清理动作。

对应`synthetic-api-content.json`是单条原生API case content。scenarioId采用合法合成UUID展示字段类型；在真实平台创建用例时必须使用实际场景回执ID。该JSON本身不是工具完整请求，也不表示已保存、已审或已执行。
