import React, { FormEvent, useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { DNA } from 'react-loader-spinner';

export default function Home() {
  const [query, setQuery] = useState('');
  const [conversations, setConversations] = useState<{ question: string; answer: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const newConversation = { question: query, answer: '' };
    setConversations((prev) => [...prev, newConversation]);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let done, value;
      let answer = '';

      while (!done) {
        ({ done, value } = await reader.read());
        answer += decoder.decode(value || new Uint8Array());
        setConversations((prev) => {
          const updatedConversations = [...prev];
          updatedConversations[updatedConversations.length - 1].answer = answer;
          return updatedConversations;
        });
      }
    } catch (error) {
      setConversations((prev) => {
        const updatedConversations = [...prev];
        updatedConversations[updatedConversations.length - 1].answer = '#Oops! Something went wrong. Please try again later.';
        return updatedConversations;
      });
    } finally {
      setQuery('');
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {conversations.map((conv, index) => (
          <div key={index} className="chat-message">
            <p className="question"><strong>You:</strong> {conv.question}</p>
            {
              isLoading && index == conversations.length - 1 ? <DNA/> : 
              <div className="answer">
                <ReactMarkdown>{conv.answer}</ReactMarkdown>
              </div>
            }
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
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
