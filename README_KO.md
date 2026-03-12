# textview-mcp

<p align="center">
  <strong>AI가 모든 것을 기억하게 하세요.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/v/textview-mcp" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/textview-mcp"><img src="https://img.shields.io/npm/dm/textview-mcp" alt="npm downloads"></a>
  <a href="https://smithery.ai/server/textview-mcp"><img src="https://smithery.ai/badge/textview-mcp" alt="Smithery"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license"></a>
</p>

<p align="center">
  <a href="#빠른-시작">빠른 시작</a> · <a href="#도구">도구</a> · <a href="#사용-사례">사용 사례</a> · <a href="./README.md">English</a> · <a href="./README_CN.md">中文</a> · <a href="./README_JA.md">日本語</a>
</p>

---

**textview-mcp** 는 AI 어시스턴트(Claude, Cursor, Windsurf 등)를 [TextView](https://textview.cn)에 연결하는 [MCP 서버](https://modelcontextprotocol.io)입니다. TextView는 AI 에이전트를 위해 설계된 클라우드 기반 노트 플랫폼입니다.

**AI의 영구 메모리**로 활용하세요: 회의 메모, 리서치 결과, 코드 스니펫, 일기 등 AI가 생성한 모든 것을 세션을 넘어 저장, 검색, 불러올 수 있습니다.

## 왜 textview-mcp인가요?

AI 대화는 일시적입니다. Claude와 훌륭한 브레인스토밍을 하다가 창을 닫으면 모두 사라집니다. **textview-mcp** 가 이 문제를 해결합니다:

- **AI가 쓰고, 당신이 확인** — AI 에이전트가 직접 문서를 저장. [textview.cn](https://textview.cn) 에서 언제 어디서나 확인 가능.
- **세션을 넘는 기억** — 한 세션의 Claude가 다른 세션의 Claude가 작성한 내용을 읽을 수 있습니다.
- **도구 간 동기화** — Cursor에서 저장, Claude Desktop에서 읽고, 스마트폰에서 확인.
- **리치 포맷** — 문서는 일반 텍스트가 아닌 리치 텍스트(HTML)로 저장됩니다.

## 빠른 시작

### 1. API 토큰 받기

[textview.cn](https://textview.cn) 에서 회원가입 후, 아바타 → **API Token** → 생성 클릭.

### 2. AI 도구 설정

<details>
<summary><strong>Claude Desktop</strong></summary>

`claude_desktop_config.json` 편집:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_내_토큰"
      }
    }
  }
}
```

저장 후 Claude Desktop을 재시작하세요.

</details>

<details>
<summary><strong>Cursor</strong></summary>

프로젝트 루트에 `.cursor/mcp.json` 생성 또는 편집:

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_내_토큰"
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Windsurf</strong></summary>

**설정 → MCP** 에서 추가:

```json
{
  "mcpServers": {
    "textview": {
      "command": "npx",
      "args": ["-y", "textview-mcp"],
      "env": {
        "TEXTVIEW_TOKEN": "tv_내_토큰"
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

환경 변수 `TEXTVIEW_TOKEN=tv_내_토큰` 을 설정하세요.

</details>

### 3. 사용 시작

AI에게 자연스럽게 말하세요:

> "이 대화를 '3월 11일 회의 메모'라는 문서로 저장해줘"

> "최근 문서 목록 보여줘"

> "API 재설계에 관한 내 메모 찾아줘"

## 도구

| 도구 | 설명 |
|------|------|
| `save_document` | TextView에 새 문서 저장 |
| `list_documents` | 문서 목록 조회 (검색 옵션 포함) |
| `get_document` | ID로 문서 불러오기 |
| `update_document` | 기존 문서의 제목이나 내용 수정 |

## 사용 사례

### 일기
> "오늘 일기 저장해줘: 우리가 논의한 내용과 결정 사항을 요약해서."

### 리서치 어시스턴트
> "MCP 프로토콜에 관한 이 리서치 요약을 내 메모에 저장해줘."

### 코드 문서화
> "이 프로젝트의 아키텍처를 문서화해서 TextView에 저장해줘."

### 회의 메모
> "스프린트 플래닝이 끝났어. 액션 아이템을 문서로 저장해줘."

### 세션 간 컨텍스트
> "내 메모 확인해줘 — 지난주에 PostgreSQL이랑 MySQL 중 어떤 걸로 결정했지?"

## 요구 사항

- [Node.js](https://nodejs.org/) 18 이상
- 무료 [TextView](https://textview.cn) 계정

## 환경 변수

| 변수 | 필수 | 설명 |
|------|------|------|
| `TEXTVIEW_TOKEN` | 예 | API 토큰 (`tv_` 로 시작), [textview.cn](https://textview.cn) 에서 생성 |

## 작동 방식

```
AI 도구 (Claude, Cursor 등)
    ↕ MCP 프로토콜 (stdio)
textview-mcp (이 패키지)
    ↕ HTTPS
TextView 클라우드 API
    ↕
내 문서 (모든 기기에서 접근 가능)
```

## 개발

```bash
git clone https://github.com/mrliuzhiyu/textview-mcp.git
cd textview-mcp
npm install
npm run dev
```

## 라이선스

[MIT](./LICENSE)

---

<p align="center">
  Built by <a href="https://textview.cn">TextView</a> — 에이전트 시대를 위한 AI 네이티브 노트 도구.
</p>
