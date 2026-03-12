# textview-mcp

<p align="center">
  <strong>AIにすべてを記憶させよう。</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/v/textview-mcp" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/dm/textview-mcp" alt="npm downloads"></a>
  <a href="https://smithery.ai/server/textview-mcp"><img src="https://smithery.ai/badge/textview-mcp" alt="Smithery"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license"></a>
</p>

<p align="center">
  <a href="#クイックスタート">クイックスタート</a> · <a href="#ツール">ツール</a> · <a href="#ユースケース">ユースケース</a> · <a href="./README.md">English</a> · <a href="./README_CN.md">中文</a> · <a href="./README_KO.md">한국어</a>
</p>

---

**textview-mcp** は、AIアシスタント（Claude、Cursor、Windsurfなど）を [TextView](https://textview.cn) に接続する [MCPサーバー](https://modelcontextprotocol.io) です。TextViewはAIエージェント向けに設計されたクラウドベースのノートプラットフォームです。

**AIの永続メモリ**として機能します：会議メモ、調査結果、コードスニペット、日記など、AIが生成したものをセッションを超えて保存・検索・取得できます。

## なぜ textview-mcp？

AIの会話は一時的なものです。Claudeと素晴らしいブレインストーミングをして、ウィンドウを閉じると消えてしまいます。**textview-mcp** はこれを解決します：

- **AIが書き、あなたが確認** — AIエージェントが直接ドキュメントを保存。[textview.cn](https://textview.cn) からいつでもどのデバイスでも確認できます。
- **セッションを超えた記憶** — あるセッションのClaudeが、別のセッションのClaudeが書いたものを読めます。
- **ツール間の同期** — Cursorで保存、Claude Desktopで読み込み、スマートフォンで確認。
- **リッチフォーマット** — ドキュメントはリッチテキスト（HTML）として保存されます。

## クイックスタート

### 1. APIトークンを取得

[textview.cn](https://textview.cn) でサインアップし、アバター → **API Token** → 生成 をクリック。

### 2. AIツールを設定

<details>
<summary><strong>Claude Desktop</strong></summary>

`claude_desktop_config.json` を編集：
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_あなたのトークン"
      }
    }
  }
}
```

保存後、Claude Desktopを再起動してください。

</details>

<details>
<summary><strong>Cursor</strong></summary>

プロジェクトルートに `.cursor/mcp.json` を作成または編集：

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_あなたのトークン"
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Windsurf</strong></summary>

**設定 → MCP** を開いて追加：

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_あなたのトークン"
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

環境変数 `TEXTVIEW_TOKEN=tv_あなたのトークン` を設定してください。

</details>

### 3. 使い始める

AIに自然に話しかけるだけ：

> 「この会話を『3月11日ミーティングメモ』というドキュメントとして保存して」

> 「最近のドキュメントを見せて」

> 「APIリデザインについてのメモを探して」

## ツール

| ツール | 説明 |
|--------|------|
| `save_document` | TextViewに新しいドキュメントを保存 |
| `list_documents` | ドキュメントの一覧表示（検索オプション付き） |
| `get_document` | IDでドキュメントを取得 |
| `update_document` | 既存ドキュメントのタイトルや内容を更新 |

## ユースケース

### 日記
> 「今日の日記エントリーを保存して：話し合った内容と決定事項をまとめて。」

### リサーチアシスタント
> 「MCPプロトコルについてのこの調査まとめをメモに保存して。」

### コードドキュメント
> 「このプロジェクトのアーキテクチャをドキュメント化してTextViewに保存して。」

### 会議メモ
> 「スプリントプランニングが終わった。アクションアイテムをドキュメントとして保存して。」

### セッション間のコンテキスト
> 「メモを確認して — 先週PostgreSQLとMySQLのどちらに決めたっけ？」

## 要件

- [Node.js](https://nodejs.org/) 18以上
- 無料の [TextView](https://textview.cn) アカウント

## 環境変数

| 変数 | 必須 | 説明 |
|------|------|------|
| `TEXTVIEW_TOKEN` | はい | APIトークン（`tv_` で始まる）、[textview.cn](https://textview.cn) で生成 |

## 仕組み

```
AIツール（Claude、Cursorなど）
    ↕ MCPプロトコル（stdio）
textview-mcp（このパッケージ）
    ↕ HTTPS
TextView クラウドAPI
    ↕
あなたのドキュメント（どのデバイスからでもアクセス可能）
```

## 開発

```bash
git clone https://github.com/mrliuzhiyu/textview-mcp.git
cd textview-mcp
npm install
npm run dev
```

## ライセンス

[MIT](./LICENSE)

---

<p align="center">
  Built by <a href="https://textview.cn">TextView</a> — エージェント時代のAIネイティブなノートツール。
</p>
