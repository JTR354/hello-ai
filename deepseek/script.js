// https://platform.deepseek.com/
import { VITE_DEEPSEEK_API_KEY } from './env.js';
// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 获取按钮和回复元素
    const askButton = document.getElementById('ask');
    const replyElement = document.getElementById('reply');

    // 添加按钮点击事件
    askButton.addEventListener('click', async function () {
        // 显示加载状态
        replyElement.textContent = 'thinking...';

        try {
            const endpoint = 'https://api.deepseek.com/chat/completions';
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${VITE_DEEPSEEK_API_KEY}`
            };

            const payload = {
                model: 'deepseek-chat',
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: "你好 Deepseek" }
                ],
                stream: false,
            };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            replyElement.textContent = data.choices[0].message.content;
        } catch (error) {
            replyElement.textContent = '请求出错: ' + error.message;
        }
    });
});