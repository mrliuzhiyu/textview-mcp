# textview-mcp

<p align="center">
  <strong>让 AI 帮你记住一切。</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/v/textview-mcp" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/dm/textview-mcp" alt="npm downloads"></a>
  <a href="https://smithery.ai/server/textview-mcp"><img src="https://smithery.ai/badge/textview-mcp" alt="Smithery"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license"></a>
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> · <a href="#可用工具">可用工具</a> · <a href="#使用场景">使用场景</a> · <a href="./README.md">English</a>
</p>

---

**textview-mcp** 是一个 [MCP Server](https://modelcontextprotocol.io)，将 AI 助手（Claude、Cursor、Windsurf 等）连接到 [TextView](https://textview.cn) —— 一个为 AI Agent 设计的云端记录平台。

它是 **AI 的持久记忆**：会议纪要、研究发现、代码文档、每日日志 —— AI 产出的一切内容都可以保存、搜索、跨会话调用。

## 为什么需要它？

AI 对话是短暂的。你和 Claude 进行了一次精彩的头脑风暴，关掉窗口，一切就消失了。**textview-mcp** 解决这个问题：

- **AI 写你来看** —— 让 AI 直接保存文档，你随时在 [textview.cn](https://textview.cn) 任何设备上查阅
- **跨会话记忆** —— 一个对话里的 Claude 能读到另一个对话里 Claude 写的内容
- **跨工具同步** —— 在 Cursor 里保存，在 Claude Desktop 里读取，在手机上查看
- **富文本格式** —— 文档以富文本（HTML）保存，不是纯文本

## 快速开始

### 1. 获取 API Token

在 [textview.cn](https://textview.cn) 注册，点击头像 → **API 令牌** → 生成。

### 2. 配置你的 AI 工具

<details>
<summary><strong>Claude Desktop</strong></summary>

编辑 `claude_desktop_config.json`：
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_你的令牌"
      }
    }
  }
}
```

保存后重启 Claude Desktop。

</details>

<details>
<summary><strong>Cursor</strong></summary>

在项目根目录创建或编辑 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_你的令牌"
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Windsurf</strong></summary>

进入 **Settings → MCP**，添加：

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_你的令牌"
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude mcp add textview -- npx -y textview-mcp
```

然后设置环境变量 `TEXTVIEW_TOKEN=tv_你的令牌`。

</details>

### 3. 开始使用

用自然语言对 AI 说：

> "把这次对话保存为文档，标题叫《3月11日会议纪要》"

> "看看我最近的文档"

> "找一下我之前写的关于 API 重构的笔记"

## 可用工具

| 工具 | 说明 |
|------|------|
| `save_document` | 保存新文档到 TextView |
| `list_documents` | 列出文档（支持搜索） |
| `get_document` | 获取文档内容 |
| `update_document` | 更新文档标题或内容 |

## 使用场景

### 每日日志
> "帮我写一篇今天的工作日志，总结我们讨论的内容和做的决定。"

### 研究助手
> "把这份关于 MCP 协议的调研总结保存到我的笔记里。"

### 代码文档
> "把这个项目的架构整理成文档，保存到 TextView。"

### 会议纪要
> "刚开完迭代规划会，把行动项保存为文档。"

### 跨会话上下文
> "看看我的笔记——上周我们是决定用 PostgreSQL 还是 MySQL 来着？"

## 环境变量

| 变量 | 必需 | 说明 |
|------|------|------|
| `TEXTVIEW_TOKEN` | 是 | API 令牌（tv_ 开头），在 [textview.cn](https://textview.cn) 生成 |

## 工作原理

```
AI 工具 (Claude, Cursor 等)
    ↕ MCP 协议 (stdio)
textview-mcp (本包)
    ↕ HTTPS
TextView 云端 API
    ↕
你的文档 (任何设备可访问)
```

## 本地开发

```bash
git clone https://github.com/fisherdaddy/textview-mcp.git
cd textview-mcp
npm install
npm run dev
```

## 参与贡献

欢迎提交 Pull Request！

## 开源协议

[MIT](./LICENSE)

---

<p align="center">
  由 <a href="https://textview.cn">TextView</a> 构建 —— AI 时代的记录工具。
</p>
