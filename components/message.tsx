'use client'
import { useState } from 'react';
import { useChat } from 'ai/react';
import { Message } from 'ai/react';

export default function MessageSubmit() {
  const prompt = `
  あなたは恋愛のスペシャリストです。
  送られてくる情報をもとに異性にマッチングアプリの紹介文を考えてください。
  `;

  const initialMessages: Message[] = [
    { id: 'initial-1', role: 'system', content: prompt }
  ];

  const { messages, input, handleSubmit, setInput } = useChat({
    api: '/api/chat-gpt-api',
    initialMessages: initialMessages
  });

  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [hobby, setHobby] = useState('');
  const [holiday, setHoliday] = useState('');
  const [character, setCharacter] = useState('');
  const [aspiration, setAspiration] = useState('');
  
  const handleFormSubmit = (e:any) => {
    e.preventDefault();
    const combinedInput = `あなたは恋愛のスペシャリストです。
    下記の情報をもとに異性に好まれるようなマッチングアプリの紹介文を考えてください。
    また各項目ごとに改行してください。
    初めまして！名前は${name}です。, 
    仕事:文字数200文字 ${job},
    休日：${holiday}をもとに200文字程度の文章,
    趣味：${hobby}をもとに200文字程度の文章,
    性格：${character}をもとに200文字程度の文章,
    一言：${aspiration}をもとに200文字程度の文章`;
    setInput(combinedInput);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-left">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2">

          <div className="mb-6">
            <form onSubmit={handleFormSubmit}>
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="text"
                placeholder="ニックネームを入れてください"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="text"
                placeholder="仕事を入れてください"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="text"
                placeholder="趣味を入力してください"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="text"
                placeholder="休日にやることを入力してください"
                value={holiday}
                onChange={(e) => setHoliday(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="text"
                placeholder="性格を入力してください"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                type="text"
                placeholder="最後に一言を入れてください"
                value={aspiration}
                onChange={(e) => setAspiration(e.target.value)}
              />
              <div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                送信
              </button>
              </div>
            </form>
          </div>
          <div id="chatArea" className="mb-4 h-96 overflow-auto border p-4">
            {messages.map(message => (
              <div key={message.id} className='text-black'>
                {message.role === 'assistant' ? (
                  <div><span>AI: {message.content}</span></div>
                ) : (
                  <div><span> {message.content}</span></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
