# 原生API数据与实际工具

## 获取当前契约

运行时优先使用宿主当前发现的官方AITestHub工具及其Schema；本文件给出维护方向，不取代当前服务端校验。工具在不同宿主可能带前缀，按实际目录映射逻辑`ath_*`名称，不推断或硬编码某公司的URL。

常用真实工具族：

| 工具                                                 | 本Skill相关操作                                                                          |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `ath_projects`                                       | list/get，定位当前有权项目                                                               |
| `ath_requirements`、`ath_requirement_materials`      | 查所选需求/版本和材料；只在实际读到正文后称已读                                          |
| `ath_assets`                                         | list/get、create-set/create-scenario/create-case、revise、submit；按当前Schema选择实际op |
| `ath_reviews`                                        | opinions、optimization-notes；维护意见与实际写入修订的关联                               |
| `ath_test_configuration`、`ath_database_connections` | 读取允许的非秘密配置和连接定义，不取得目标凭据或执行任意SQL                              |
| `ath_api_runs`                                       | debug-start/debug-trace、attempt-detail/events/status；用户明确要求后由平台调试          |
| `ath_operation_status`                               | 按原operation/key或commandId查真实结果，不能视404为未执行                                |

不调用目录中不存在的prepare/commit工具。平台其他页面能力可通过当前已开放且有权的工具协助处理，但不借S04扩大到项目成员、个人Key或平台全局管理。

## API用例内容

当前原生内容使用`kind=API`、`dslVersion=ath.api-case.v1`，包括真实`scenarioId`、title、testPoint、preconditions、expected、basisRefs、variables、steps和cleanup。用例外层归属、revisionId、rowVersion、批准状态由平台管理，不能塞进content中冒充正式身份。

每个HTTP步骤包含：stepId、name、method、url、query、headers、body、extractors、assertions；purposeRef/authProfileRef及preScript/postScript/timeoutMs按当前Schema使用。method为GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS。body为none/json/text/form，其中form是URL编码表单，不是multipart文件上传。

模板上下文常用`{{env.baseUrls.服务名}}`、`{{env.变量}}`、`{{case.变量}}`和`{{extract.变量}}`。认证交给purposeRef/authProfileRef和平台绑定；不能将实际Token复制进headers或variables。

提取来源为json/header/status/body；断言来源为status/json/header/body/variable，运算符为equals/notEquals/contains/exists/matches/greaterThan/lessThan。`exists`以外需要expected，json/header/variable需要路径。路径支持平台的点路径/数组下标，不能声称完整JSONPath过滤语法已支持。至少保留有业务依据的响应断言，不为跑绿移除断言或只检查“无异常”。

preScript/postScript是平台Worker的同步受限扩展：通过只读`input`观察已允许上下文，使用`setVariable(name,value)`和`assert(passed,message)`或返回合法variables/assertions。不是Node/Postman运行环境。不要在本地执行这些脚本来假称平台已验证。

cleanup为none，或always/onSuccess加明确steps。HTTP清理引用真实requiredTargets；SQL清理只按平台当前单条DELETE、AND等值命名参数及非空目标保护生成，并引用所选环境内真实connectionId。SQL AI审核按当前项目配置与用户选择使用，不增加通用强制审核要求。没有可靠数据目标时保持缺口。

## 创建、维护与回执

创建set/scenario/case时，按工具当前结构传外层projectId及input.commandId等。先读取Schema，不能直接把整个content当作完整工具参数。

更新正式对象保留id、baseRevisionId与当前要求的rowVersion；批量提交的baseRevisionMap和各项基准一致。新建parent取得真实回执后再构造子项；不得虚造父ID。`submit`可能逐项accepted/rejected，只有已接受项可更新正式映射。

官方回执可能同时含content文本与structuredContent，使用真实data/error、isError及meta判断；收到HTTP200或非空文字不等于业务成功。字段形状不符合当前公开契约、文本与结构化结果矛盾或回执丢失时保留原标识，先查原操作。

合成样例`assets/synthetic-api-content.json`仅是content结构。其scenarioId是合法的合成示例身份；实际写入必须采用目标平台真实同类型场景ID，不能把示例UUID当默认或批量替换其他正式身份。
