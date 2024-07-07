'use client'
import { useState, useEffect } from 'react';

export default function JobMessage({ job, setMessages }: { job: string, setMessages: (messages: { role: string, content: string }[]) => void }) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/chat-gpt-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: '関西弁で話してください。' },
            { role: 'user', content: `仕事: ${job}` },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages); // 取得したメッセージを設定
      }
    };

    fetchData();
  }, [job, setMessages]);

  return null; // このコンポーネントは何も表示しない
}
