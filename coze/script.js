// https://www.coze.cn/
import { VITE_COZE_BOT_ID, VITE_COZE_API_KEY } from './env.js';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 获取按钮和回复元素
    const askButton = document.getElementById('askButton');
    const replyElement = document.getElementById('reply');

    // 添加按钮点击事件
    askButton.addEventListener('click', async function () {
        // 显示加载状态
        replyElement.textContent = 'thinking...';

        try {
            const endpoint = 'https://api.coze.cn/open_api/v2/chat';

            const payload = {
                bot_id: VITE_COZE_BOT_ID,
                user: 'yvo',
                query: '你好',
                chat_history: [],
                stream: false,
                custom_variables: {
                    prompt: "你是一个AI助手"
                }
            };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${VITE_COZE_API_KEY}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            replyElement.textContent = data.messages[0].content;
        } catch (error) {
            replyElement.textContent = '请求出错: ' + error.message;
        }
    });
});