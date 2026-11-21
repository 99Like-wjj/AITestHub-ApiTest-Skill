# 用户要求后的平台调试

调试会真实请求被测系统。仅在用户明确要求对指定范围、环境进行调试时调用平台；没有发起指令时交付生成内容与静态缺口即可。平台地址、MCP已安装、用例已保存或测试环境名称都不能替代这条执行意图。

使用宿主实际发现的工具`ath_api_runs`，选择其`op: "debug-start"`，按当前Schema提供commandId、environmentId、productBuild、sourceCaseId/sourceCaseRevisionId、必要场景修订与完整API content。新增未保存草稿的sourceCaseId和sourceCaseRevisionId可为null，但scenarioId仍须是该项目实际API场景，不虚构来源批准。

包含 `dataRows` 时，用 `dataRowId` 指定本轮要调试的实际数据行，保留该行和固定准备修订与调试回执的关联。其它数据行的运行和平台回归资格分别以真实回执为准。

发起前核对这次的真实内容和环境/用途/副作用范围，按现有平台规则处理清理和确认。调试应交由平台Worker执行；不能转用本地curl、Python、浏览器fetch、直连数据库或另造运行器补齐能力。后台SQL/脚本也不能由本地AI代跑。

先保管原commandId和固定参数，再取得原runId、draftHash及debugResultUrl等真实回执。调试先保留独立诊断、候选内容与原基准。

通过debug-trace、attempt-detail、events或平台调试页面读取同一run的安全请求/响应、提取、断言、清理和结果确定性。只取任务相关必要内容，不能读worker凭据或从遮蔽信息还原秘密。

分析时区分缺少接口资料、变量/认证配置缺口、网络/平台控制问题、脚本或断言实现问题、真实业务违反和结果未知。业务预期仍以已确认资料为准，不把当前返回值直接写成新预期。根据真实轨迹给出修改建议；需要保存草稿时沿已有授权和CAS处理。

每次新调试都是新的真实执行；不能在失败、超时或平台不可用后隐式重跑。用户要求下一轮调试时保留上一轮事实、明确本轮修订和范围。原请求结果未知只读核对；停止生成或用户停止任务后不再启动新调试。最终分别交付生成或维护修订、实际调试轮次、观察结果、回归资格和未验证范围。

## 保存可回归修订

项目认可的环境配置允许验证回归资格。已通过回执须覆盖所有业务步骤和实际断言，按配置需要的清理须成功。路径及结果未知时先查原调试。目录可用时，用 `ath_api_runs/list-regression-qualifications` 查询可用修订。较新的工作稿与已有有效修订同时保留。

用户明确要求本次候选保存为可回归后，按发现的操作 `ath_api_runs/save-regression-qualification` 提交原 `caseId`、`baseRevisionId`、`rowVersion`、`debugRunId`、`draftHash`、完整候选 `content` 和新的保存命令标识 `commandId`。平台再次校验当前权限、原运行、候选内容、用例基准和环境认可。按官方交互确认这一确切修订。用 `get-regression-qualification-receipt` 查询保留的原保存命令。回执携带实际资产修订、资格快照和调试关联，才有资格保存事实。

平台回归真正开始时仍检查目标环境的用途、账号及清理绑定。停用、历史已审和新调试通过通过平台查询识别。现行工具没有这些操作时，保留实际草稿和诊断，向用户报告能力缺口。
