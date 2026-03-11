/**
 * TextView API 客户端
 * 纯 HTTP fetch，通过 Edge Function mcp-api 操作
 */

const API_URL = 'https://wgnbbfumphpkdndgqolh.supabase.co/functions/v1/mcp-api';

let _token: string;

export function initToken(): void {
  const token = process.env.TEXTVIEW_TOKEN;
  if (!token) {
    console.error('缺少环境变量: TEXTVIEW_TOKEN');
    console.error('请在 TextView 网站生成 API Token: https://textview.cn → 头像菜单 → API 令牌');
    process.exit(1);
  }
  if (!token.startsWith('tv_')) {
    console.error('TEXTVIEW_TOKEN 格式错误，应以 tv_ 开头');
    process.exit(1);
  }
  _token = token;
  console.error('Token 已加载');
}

interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  error?: string;
}

export async function callApi<T = unknown>(
  action: string,
  params: Record<string, unknown> = {},
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`,
      },
      body: JSON.stringify({ action, ...params }),
      signal: controller.signal,
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || `请求失败 (${res.status})` };
    }

    return data;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      return { error: '请求超时，请检查网络连接' };
    }
    return { error: `网络错误: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    clearTimeout(timeout);
  }
}
