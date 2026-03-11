# textview-mcp

<p align="center">
  <strong>Let AI remember everything for you.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/v/textview-mcp" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/dm/textview-mcp" alt="npm downloads"></a>
  <a href="https://smithery.ai/server/textview-mcp"><img src="https://smithery.ai/badge/textview-mcp" alt="Smithery"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license"></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> · <a href="#tools">Tools</a> · <a href="#use-cases">Use Cases</a> · <a href="./README_CN.md">中文文档</a>
</p>

---

**textview-mcp** is an [MCP server](https://modelcontextprotocol.io) that connects AI assistants (Claude, Cursor, Windsurf, etc.) to [TextView](https://textview.cn) — a cloud-based note-taking platform designed for AI agents.

Think of it as **persistent memory for your AI**: meeting notes, research findings, code snippets, daily journals — anything your AI generates can be saved, searched, and retrieved across sessions.

## Why?

AI conversations are ephemeral. You have a great brainstorming session with Claude, close the window, and it's gone. **textview-mcp** solves this:

- **AI writes, you review** — Let your AI agent save documents directly. Review them later on [textview.cn](https://textview.cn) from any device.
- **Cross-session memory** — Claude in one conversation can read what Claude in another conversation wrote.
- **Cross-tool sync** — Save from Cursor, read from Claude Desktop, review on your phone.
- **Rich formatting** — Documents are stored as rich text (HTML), not plain text.

## Quick Start

### 1. Get your API token

Sign up at [textview.cn](https://textview.cn), click your avatar → **API Token** → Generate.

### 2. Configure your AI tool

<details>
<summary><strong>Claude Desktop</strong></summary>

Edit `claude_desktop_config.json`:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_your_token_here"
      }
    }
  }
}
```

Restart Claude Desktop after saving.

</details>

<details>
<summary><strong>Cursor</strong></summary>

Create or edit `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_your_token_here"
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Windsurf</strong></summary>

Go to **Settings → MCP** and add:

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_your_token_here"
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

Then set the environment variable `TEXTVIEW_TOKEN=tv_your_token_here`.

</details>

### 3. Start using it

Just ask your AI naturally:

> "Save this conversation as a document called 'Meeting Notes March 11'"

> "Show me my recent documents"

> "Find my notes about the API redesign"

## Tools

| Tool | Description |
|------|-------------|
| `save_document` | Save a new document to TextView |
| `list_documents` | List documents (with optional search) |
| `get_document` | Retrieve a document by ID |
| `update_document` | Update an existing document's title or content |

## Use Cases

### Daily Journal
> "Save a journal entry for today: summarize what we discussed and the decisions we made."

### Research Assistant
> "Save this research summary about MCP protocols to my notes."

### Code Documentation
> "Document the architecture of this project and save it to TextView."

### Meeting Notes
> "We just finished our sprint planning. Save the action items as a document."

### Cross-Session Context
> "Check my notes — did we decide on PostgreSQL or MySQL last week?"

## Requirements

- [Node.js](https://nodejs.org/) 18+
- A free [TextView](https://textview.cn) account

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TEXTVIEW_TOKEN` | Yes | API token (starts with `tv_`), generated at [textview.cn](https://textview.cn) |

## How It Works

```
Your AI Tool (Claude, Cursor, etc.)
    ↕ MCP Protocol (stdio)
textview-mcp (this package)
    ↕ HTTPS
TextView Cloud API
    ↕
Your Documents (accessible from any device)
```

## Development

```bash
git clone https://github.com/mrliuzhiyu/textview-mcp.git
cd textview-mcp
npm install
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](./LICENSE)

---

<p align="center">
  Built by <a href="https://textview.cn">TextView</a> — AI-native note-taking for the agent era.
</p>
