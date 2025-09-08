import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const ChatBox: React.FC = () => {
    const { t } = useLanguage();
    const defaultMessages: Message[] = [
        { id: 1, user: 'Rodzic A', text: 'Cześć wszystkim! Czy ktoś był na wydarzeniu w Hadze? Jak wrażenia?', timestamp: '10:30', isOwn: false },
        { id: 2, user: 'Rodzic B', text: 'Byliśmy! Nasz syn był zachwycony dmuchańcami. Organizacja super.', timestamp: '10:32', isOwn: false },
    ];
    const [messages, setMessages] = useState<Message[]>(defaultMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // 1. Wczytaj wiadomości z localStorage przy pierwszym renderze
    useEffect(() => {
        const stored = localStorage.getItem('chatMessages');
        if (stored) {
            try {
                setMessages(JSON.parse(stored));
            } catch {}
        }
    }, []);

    // 2. Zapisuj wiadomości do localStorage przy każdej zmianie
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    // Scroll do dołu po każdej zmianie wiadomości
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 3. Symulacja odpowiedzi od innego rodzica
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: Date.now(),
            user: 'Ty',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };
        setMessages(prev => [...prev, message]);
        setNewMessage('');

        setTimeout(() => {
            const reply: Message = {
                id: Date.now() + 1,
                user: 'Rodzic C',
                text: 'Dzięki za wiadomość! My też byliśmy i było super 😊',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: false
            };
            setMessages(prev => [...prev, reply]);
        }, 2500);
    };

    return (
        <div className="flex flex-col h-[60vh] max-h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                            {!msg.isOwn && <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0"></div>}
                            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.isOwn ? 'bg-primary text-white rounded-br-lg' : 'bg-gray-200 dark:bg-zinc-700 text-dark dark:text-light rounded-bl-lg'}`}>
                                {!msg.isOwn && <p className="text-xs font-bold text-primary mb-1">{msg.user}</p>}
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.isOwn ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>{msg.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={t('chatPlaceholder')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-800 text-dark dark:text-light rounded-full focus:ring-primary focus:border-primary focus-ring"
                    />
                    <button type="submit" className="bg-primary text-white p-3 rounded-full hover:bg-cyan-600 focus-ring transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                         </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
