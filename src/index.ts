#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { initToken, callApi } from './api.js';

const server = new McpServer({
  name: 'textview-mcp',
  version: '1.1.0',
});

// ── save_document ──────────────────────────────────────────
server.tool(
  'save_document',
  '保存新文档到 TextView。content 必须为 HTML 格式（不要用 Markdown）。例: <h2>标题</h2><p>段落</p><ul><li>列表项</li></ul>',
  {
    title: z.string().describe('文档标题'),
    content: z.string().optional().describe('HTML 格式内容。用 <h2> <p> <ul><li> <ol><li> <blockquote> <strong> <em> <code> 等标签。不要用 Markdown 语法。'),
  },
  async ({ title, content }) => {
    const result = await callApi('save_document', { title, content });
    if (result.error) {
      return { content: [{ type: 'text' as const, text: `保存失败: ${result.error}` }], isError: true };
    }
    const d = result.data as { id: string; title: string; created_at: string };
    return {
      content: [{ type: 'text' as const, text: `文档已保存。\nID: ${d.id}\n标题: ${d.title}\n创建时间: ${d.created_at}` }],
    };
  }
);

// ── list_documents ─────────────────────────────────────────
server.tool(
  'list_documents',
  '列出 TextView 中的文档，按更新时间倒序排列。',
  {
    limit: z.number().min(1).max(100).optional().describe('返回数量，默认 20'),
    search: z.string().optional().describe('按标题模糊搜索'),
  },
  async ({ limit, search }) => {
    const result = await callApi('list_documents', { limit, search });
    if (result.error) {
      return { content: [{ type: 'text' as const, text: `查询失败: ${result.error}` }], isError: true };
    }
    const docs = result.data as { id: string; title: string; updated_at: string }[];
    if (!docs || docs.length === 0) {
      return { content: [{ type: 'text' as const, text: '没有找到文档。' }] };
    }
    const list = docs.map((doc, i) =>
      `${i + 1}. [${doc.id}] ${doc.title}  (更新: ${doc.updated_at})`
    ).join('\n');
    return {
      content: [{ type: 'text' as const, text: `共 ${docs.length} 篇文档:\n${list}` }],
    };
  }
);

// ── get_document ───────────────────────────────────────────
server.tool(
  'get_document',
  '获取单个文档的完整内容。',
  {
    id: z.string().uuid().describe('文档 UUID'),
  },
  async ({ id }) => {
    const result = await callApi('get_document', { id });
    if (result.error) {
      return { content: [{ type: 'text' as const, text: `获取失败: ${result.error}` }], isError: true };
    }
    const d = result.data as { id: string; title: string; content: string; created_at: string; updated_at: string };
    return {
      content: [{ type: 'text' as const, text: `标题: ${d.title}\n更新时间: ${d.updated_at}\n\n${d.content}` }],
    };
  }
);

// ── update_document ────────────────────────────────────────
server.tool(
  'update_document',
  '更新已有文档的标题或内容。至少提供 title 或 content 之一。content 必须为 HTML 格式（不要用 Markdown）。',
  {
    id: z.string().uuid().describe('文档 UUID'),
    title: z.string().optional().describe('新标题'),
    content: z.string().optional().describe('HTML 格式内容。用 <h2> <p> <ul><li> <blockquote> <strong> <em> 等标签，不要用 Markdown。'),
  },
  async ({ id, title, content }) => {
    if (title === undefined && content === undefined) {
      return { content: [{ type: 'text' as const, text: '请至少提供 title 或 content 之一。' }], isError: true };
    }
    const result = await callApi('update_document', { id, title, content });
    if (result.error) {
      return { content: [{ type: 'text' as const, text: `更新失败: ${result.error}` }], isError: true };
    }
    const d = result.data as { id: string; title: string; updated_at: string };
    return {
      content: [{ type: 'text' as const, text: `文档已更新。\nID: ${d.id}\n标题: ${d.title}\n更新时间: ${d.updated_at}` }],
    };
  }
);

// ── save_memo ─────────────────────────────────────────────
server.tool(
  'save_memo',
  '保存一条碎片记录到 TextView 记录区。适用于快速笔记、语音转文字、剪贴板内容等碎片化信息。',
  {
    content: z.string().describe('记录内容（纯文本）'),
    source: z.string().optional().describe('来源标识: mcp / xiaozhi / cli / api（默认 mcp）'),
    source_name: z.string().optional().describe('来源设备名称，如 "小智音箱"、"录音笔"'),
  },
  async ({ content, source, source_name }) => {
    const result = await callApi('save_memo', {
      content,
      source: source || 'mcp',
      source_name,
    });
    if (result.error) {
      return { content: [{ type: 'text' as const, text: `保存失败: ${result.error}` }], isError: true };
    }
    const d = result.data as { id: string; content: string; source: string; created_at: string };
    return {
      content: [{ type: 'text' as const, text: `记录已保存。\nID: ${d.id}\n来源: ${d.source}\n时间: ${d.created_at}` }],
    };
  }
);

// ── list_memos ────────────────────────────────────────────
server.tool(
  'list_memos',
  '查询 TextView 记录区的碎片记录，按时间倒序。',
  {
    limit: z.number().min(1).max(100).optional().describe('返回数量，默认 20'),
    date: z.string().optional().describe('按日期过滤，格式 YYYY-MM-DD'),
    source: z.string().optional().describe('按来源过滤: web / desktop / mcp / xiaozhi / cli / api'),
  },
  async ({ limit, date, source }) => {
    const result = await callApi('list_memos', { limit, date, source });
    if (result.error) {
      return { content: [{ type: 'text' as const, text: `查询失败: ${result.error}` }], isError: true };
    }
    const memos = result.data as { id: string; content: string; source: string; source_name?: string; created_at: string }[];
    if (!memos || memos.length === 0) {
      return { content: [{ type: 'text' as const, text: '没有找到记录。' }] };
    }
    const list = memos.map((m, i) => {
      const src = m.source_name ? `${m.source}(${m.source_name})` : m.source;
      const preview = m.content.length > 80 ? m.content.slice(0, 80) + '...' : m.content;
      return `${i + 1}. [${src}] ${preview}  (${m.created_at})`;
    }).join('\n');
    return {
      content: [{ type: 'text' as const, text: `共 ${memos.length} 条记录:\n${list}` }],
    };
  }
);

// ── 启动 ───────────────────────────────────────────────────
async function main() {
  initToken();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('textview-mcp 已启动');
}

main().catch((err) => {
  console.error('启动失败:', err);
  process.exit(1);
});
