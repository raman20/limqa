import React, { FormEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DNA } from 'react-loader-spinner';
import Head from 'next/head';

export default function Home() {
  const [query, setQuery] = useState('');
  const [conversations, setConversations] = useState<{ question: string; answer: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query || query.length > 150) {
      alert("Please enter a valid query (1-150 characters).");
      return;
    }

    const newConversation = { question: query, answer: '' };
    setConversations((prev) => [...prev, newConversation]);
    setIsLoading(true);
    const setAnswer = (answer: string) => setConversations((prev) => {
      const updatedConversations = [...prev];
      updatedConversations[updatedConversations.length - 1].answer = answer;
      return updatedConversations;
    });

    try {
      const res = await fetch(`/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let done, value;
      let answer = '';

      while (!done) {
        ({ done, value } = await reader.read());
        answer += decoder.decode(value || new Uint8Array());
        setAnswer(answer);
      }
    } catch (error) {
      setAnswer('**Oops something went wrong!!**');
    } finally {
      setQuery('');
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {conversations.length ? <></> : <>
          <h2 className="chat-heading">LimQA</h2>
          <p className="tagline">Your questions, our answers!</p></>
        }
        {conversations.map((conv, index) => (
          <div key={index} className="chat-message">
            <p className="question"><strong>You:</strong> {conv.question}</p>
            {
              isLoading && index === conversations.length - 1 ? <DNA /> :
                <div className="answer">
                  <ReactMarkdown>{conv.answer}</ReactMarkdown>
                </div>
            }
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything... up to 150 chars"
          className="input"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !query} className="button">
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
