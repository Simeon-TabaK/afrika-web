import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Plus,
  Phone,
  Video,
  ChevronLeft,
  Mic,
  Send,
  Check,
  CheckCheck,
  FileText
} from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline: boolean;
  category: 'direct' | 'community';
  isFavorite?: boolean;
}

interface Message {
  id: string;
  conversationId: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export const MessagesView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [selectedConversationId, setSelectedConversationId] = useState<string>('c1');
  const [showMobileChat, setShowMobileChat] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favorites' | 'community'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'c1',
      name: 'Angels JS',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      lastMessage: 'Thx brother',
      time: '20:58',
      isOnline: true,
      category: 'direct',
      isFavorite: true,
    },
    {
      id: 'c2',
      name: 'Oredi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      lastMessage: 'Le programme est pour demain',
      time: '20:58',
      isOnline: false,
      category: 'direct',
    },
    {
      id: 'c3',
      name: 'Daniel Munoka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      lastMessage: 'Hahah Ata ivi',
      time: '20:58',
      isOnline: true,
      category: 'direct',
    },
    {
      id: 'c4',
      name: 'Igor Mupenzi',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200',
      lastMessage: 'Spécifications techniques du projet',
      time: '20:58',
      unreadCount: 1,
      isOnline: true,
      category: 'community',
      isFavorite: true,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      conversationId: 'c1',
      sender: 'me',
      text: "Bonjour! comment allallez-vous aujourd'hui?",
      time: '20:45',
    },
    {
      id: 'm2',
      conversationId: 'c1',
      sender: 'them',
      text: 'Bonjour! Je vais bien et vous?',
      time: '20:48',
    },
    {
      id: 'm3',
      conversationId: 'c1',
      sender: 'me',
      text: 'Ça va, comment puis-je vous aider?',
      time: '20:52',
    },
    {
      id: 'm4',
      conversationId: 'c1',
      sender: 'them',
      text: "Après une intense discussion avec Gloire qui a porté sur l'examen du plan de communication, nous avons avons estimé nécessaire de lancer les travaux",
      time: '20:55',
    },
  ]);

  const activeConversation = conversations.find(c => c.id === selectedConversationId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'unread') return (c.unreadCount || 0) > 0;
    if (activeFilter === 'favorites') return c.isFavorite;
    if (activeFilter === 'community') return c.category === 'community';
    return true;
  });

  const activeMessages = messages.filter(m => m.conversationId === activeConversation.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId: activeConversation.id,
      sender: 'me',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation.id) {
        return { ...c, lastMessage: newMsg.text, time: newMsg.time };
      }
      return c;
    }));
    setInputMessage('');
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
    if (isMobile) {
      setShowMobileChat(true);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 0 40px 0',
      }}
    >
      {/* Container Card Matching Mockup Screenshot 1 */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          height: 'calc(100vh - 170px)',
          minHeight: '620px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)',
          color: '#0F172A',
        }}
      >
        {/* =========================================================================
            LEFT COLUMN : CONVERSATIONS LIST (Mockup Left Panel)
            ========================================================================= */}
        {(!isMobile || !showMobileChat) && (
          <div
            style={{
              width: isMobile ? '100%' : '370px',
              minWidth: isMobile ? '100%' : '340px',
              borderRight: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              background: '#FFFFFF',
            }}
          >
            {/* Header: Title + Plus Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 20px 16px 20px',
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#0F172A',
                  margin: 0,
                  letterSpacing: '-0.3px',
                }}
              >
                Messages
              </h2>

              <button
                type="button"
                title="Nouveau message"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1.5px solid #0EA5E9',
                  background: 'transparent',
                  color: '#0EA5E9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                }}
              >
                <Plus size={20} strokeWidth={2.4} />
              </button>
            </div>

            {/* Search Bar Input */}
            <div style={{ padding: '0 20px 16px 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#F1F5F9',
                  borderRadius: '12px',
                  padding: '10px 14px',
                }}
              >
                <Search size={17} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#0F172A',
                    width: '100%',
                  }}
                />
              </div>
            </div>

            {/* Filter Chips: Tout | Non lu 120 | Favoris | Communauté */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '0 20px 16px 20px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeFilter === 'all' ? '#4A8A2A' : '#F1F5F9',
                  color: activeFilter === 'all' ? '#FFFFFF' : '#64748B',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Tout
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('unread')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeFilter === 'unread' ? '#4A8A2A' : '#F1F5F9',
                  color: activeFilter === 'unread' ? '#FFFFFF' : '#64748B',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Non lu 120
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('favorites')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeFilter === 'favorites' ? '#4A8A2A' : '#F1F5F9',
                  color: activeFilter === 'favorites' ? '#FFFFFF' : '#64748B',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Favoris
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('community')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeFilter === 'community' ? '#4A8A2A' : '#F1F5F9',
                  color: activeFilter === 'community' ? '#FFFFFF' : '#64748B',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Communauté
              </button>
            </div>

            {/* Conversation List Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
              {filteredConversations.map(c => {
                const isSelected = activeConversation.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleSelectConversation(c.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      background: isSelected ? '#F8FAFC' : 'transparent',
                      transition: 'background 0.15s ease',
                      position: 'relative',
                    }}
                  >
                    {/* Avatar with optional online dot */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                      {c.isOnline && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '1px',
                            right: '1px',
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            background: '#22C55E',
                            border: '2px solid #FFFFFF',
                          }}
                        />
                      )}
                    </div>

                    {/* Texts */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                          {c.name}
                        </span>
                        <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
                          {c.time}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden' }}>
                          <Check size={14} color="#0EA5E9" strokeWidth={2.5} />
                          {c.id === 'c4' && <FileText size={13} color="#94A3B8" />}
                          <span
                            style={{
                              fontSize: '13px',
                              color: '#64748B',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {c.lastMessage}
                          </span>
                        </div>

                        {c.unreadCount && c.unreadCount > 0 && (
                          <span
                            style={{
                              width: '19px',
                              height: '19px',
                              borderRadius: '50%',
                              background: '#4A8A2A',
                              color: '#FFFFFF',
                              fontSize: '11px',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {c.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            RIGHT COLUMN : ACTIVE CHAT PANEL (Mockup Right Panel)
            ========================================================================= */}
        {(!isMobile || showMobileChat) && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              background: '#FFFFFF',
            }}
          >
            {/* Top Chat Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              {/* Left: Back Arrow + Contact Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  type="button"
                  onClick={() => setShowMobileChat(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'transparent',
                    border: 'none',
                    color: '#0F172A',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                >
                  <ChevronLeft size={22} />
                  <span>123</span>
                </button>

                <img
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />

                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    {activeConversation.name}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    en ligne <span style={{ fontSize: '10px' }}>●</span>
                  </span>
                </div>
              </div>

              {/* Right: Phone & Video Call Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#0F172A' }}>
                <button
                  type="button"
                  title="Appel vocal"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: '6px' }}
                >
                  <Phone size={20} strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  title="Appel vidéo"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: '6px' }}
                >
                  <Video size={21} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Chat Body with Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Date Separator */}
              <div style={{ textAlign: 'center', margin: '4px 0 12px 0' }}>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#94A3B8',
                    fontWeight: 600,
                  }}
                >
                  Aujourd'hui
                </span>
              </div>

              {/* Message Bubbles */}
              {activeMessages.map(msg => {
                const isMe = msg.sender === 'me';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: isMe ? 'flex-end' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: '14px 18px',
                        borderRadius: isMe ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                        background: isMe ? '#4A8A2A' : '#0B0F19',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        lineHeight: 1.5,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '4px',
                          marginTop: '4px',
                          fontSize: '10px',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck size={12} />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Bottom Input Bar (Mockup faithful: (+) pill-input mic(+)) */}
            <div
              style={{
                padding: '14px 20px',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#FFFFFF',
              }}
            >
              {/* Plus Button */}
              <button
                type="button"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#0B0F19',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>

              {/* Form with Pill input */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  background: '#F1F5F9',
                  borderRadius: '999px',
                  padding: '6px 16px',
                  border: '1.5px solid #E2E8F0',
                }}
              >
                <input
                  type="text"
                  placeholder="Écrire un message..."
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#0F172A',
                    padding: '6px 0',
                  }}
                />

                {inputMessage.trim() ? (
                  <button
                    type="submit"
                    style={{
                      background: '#4A8A2A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Send size={15} />
                  </button>
                ) : null}
              </form>

              {/* Mic (+) Button */}
              <button
                type="button"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'transparent',
                  color: '#0F172A',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <Mic size={22} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
