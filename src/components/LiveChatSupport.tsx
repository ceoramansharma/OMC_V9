import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Bot, User, CheckCircle2, ShieldCheck, 
  ArrowRight, Phone, Sparkles, Clock, ChevronDown, Minimize2 
} from 'lucide-react';

interface LiveChatSupportProps {
  onOpenApply: (stateId?: string, serviceId?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
  actionButton?: {
    label: string;
    stateId?: string;
    serviceId?: string;
  };
}

export const LiveChatSupport: React.FC<LiveChatSupportProps> = ({ onOpenApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Hello! 👋 I'm Sarah, your patient intake coordinator at Online MMJ Card. How can I help you today? You can ask me about state pricing, qualifying conditions, or how the 15-minute telehealth evaluation works!",
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    'Do I qualify for an MMJ card?',
    'How much does it cost in my state?',
    'How fast do I get my certificate?',
    'What if the doctor does not approve me?',
    'Can I renew an existing card from another clinic?',
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Listen for open-live-chat global event
  useEffect(() => {
    const handleOpenExternal = () => {
      setIsOpen(true);
      setUnreadCount(0);
      setHasInteracted(true);
    };
    window.addEventListener('open-live-chat', handleOpenExternal);
    return () => window.removeEventListener('open-live-chat', handleOpenExternal);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
    setHasInteracted(true);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate smart medical intake assistant response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = '';
      let actionBtn: { label: string; stateId?: string; serviceId?: string } | undefined = undefined;

      if (lower.includes('qualify') || lower.includes('condition') || lower.includes('symptom') || lower.includes('pain')) {
        replyText = "In most states, qualifying conditions include chronic pain, severe anxiety, PTSD, insomnia, migraines, arthritis, fibromyalgia, and nausea. In states like California, New York, and Oklahoma, our physicians can also approve you for any symptom where medical cannabis provides therapeutic benefit. Our patient approval rate is 99%!";
        actionBtn = { label: 'Start 5-Minute Intake Form' };
      } else if (lower.includes('cost') || lower.includes('price') || lower.includes('fee') || lower.includes('how much')) {
        replyText = "Our evaluation rates start at just $39.99 (California) and range between $89 and $149 for states like NY, FL, OH, PA, and OK. Card renewals are even cheaper! You only pay if our licensed physician approves you—otherwise you receive a 100% full refund.";
        actionBtn = { label: 'View State Pricing & Apply' };
      } else if (lower.includes('fast') || lower.includes('time') || lower.includes('how long') || lower.includes('turnaround')) {
        replyText = "The entire process takes approximately 15 minutes! The intake form takes 3-5 minutes, followed by a brief video/phone evaluation with our certified doctor. Once approved, your signed official PDF recommendation is emailed to you instantly so you can visit licensed dispensaries the same day.";
        actionBtn = { label: 'Connect With Doctor Now' };
      } else if (lower.includes('approve') || lower.includes('refund') || lower.includes('guarantee') || lower.includes('money back')) {
        replyText = "We offer a 100% Ironclad Money-Back Guarantee. If our doctor reviews your medical history and decides cannabis is not medically appropriate for your condition, you are refunded 100% of your evaluation fee immediately with zero processing deductions.";
        actionBtn = { label: 'Get Evaluated Risk-Free' };
      } else if (lower.includes('renew') || lower.includes('renewal') || lower.includes('expire')) {
        replyText = "Yes! You can renew with us even if your previous card was issued by another clinic or doctor. Simply select 'MMJ Card Renewal' during intake to get our discounted renewal rate.";
        actionBtn = { label: 'Start Renewal Application', serviceId: 'renewal' };
      } else if (lower.includes('travel') || lower.includes('reciprocity') || lower.includes('other state')) {
        replyText = "Many states practice medical reciprocity! States like Nevada, Michigan, Oklahoma (temp permit), Maine, Puerto Rico, and Washington D.C. accept out-of-state medical cards. You can use our interactive State Reciprocity Checker on the site to see details.";
      } else if (lower.includes('cultivat') || lower.includes('grow') || lower.includes('99 plant')) {
        replyText = "We offer official 99-Plant Extended Cultivation recommendations for qualified patients who need higher plant limits for medical oils, juicing, or continuous personal therapy for $149.";
        actionBtn = { label: 'Get 99-Plant Cultivation Rec', serviceId: 'cultivation' };
      } else if (lower.includes('doctor') || lower.includes('call') || lower.includes('phone') || lower.includes('speak')) {
        replyText = "You can speak with our patient coordinators 7 days a week at (800) 420-6652 from 8:00 AM to 10:00 PM EST, or start your online application right now!";
        actionBtn = { label: 'Begin Consultation Intake' };
      } else {
        replyText = "Thank you for reaching out! Online MMJ Card provides 100% legal, HIPAA-compliant telehealth evaluations in your state with board-certified physicians. You can complete our quick online intake now and receive your official digital recommendation letter today.";
        actionBtn = { label: 'Start My Online Application' };
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButton: actionBtn,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Expanded Live Chat Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center font-bold text-white shadow-xs">
                  SM
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">Sarah M.</span>
                  <span className="text-[10px] font-semibold bg-emerald-500/30 text-emerald-200 px-1.5 py-0.5 rounded border border-emerald-400/30">
                    Coordinator
                  </span>
                </div>
                <div className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online · Live MMJ Intake Assistant</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-lg transition-colors"
              title="Minimize chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Security Banner */}
          <div className="bg-slate-50 px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>HIPAA Compliant & Confidential</span>
            </div>
            <span>Avg Response: &lt;1 min</span>
          </div>

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Optional Inline Action Button */}
                  {msg.actionButton && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenApply(msg.actionButton?.stateId, msg.actionButton?.serviceId);
                        }}
                        className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>{msg.actionButton.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-500 rounded-2xl px-3 py-2 w-16 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Carousel */}
          <div className="p-2 bg-white border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
              Common Questions:
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors border border-slate-200/60"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Sarah a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2 rounded-xl transition-colors ${
                inputText.trim()
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <div className="flex items-center gap-2">
          {/* Welcome Prompt Pill (disappears once clicked) */}
          {!hasInteracted && (
            <div
              onClick={handleOpenChat}
              className="hidden sm:flex items-center gap-2 bg-white text-slate-800 px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 text-xs font-semibold cursor-pointer hover:border-emerald-400 transition-all animate-in fade-in slide-in-from-right-3"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Questions? Chat with our intake coordinator!</span>
            </div>
          )}

          <button
            onClick={handleOpenChat}
            className="relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 group focus:outline-none"
            aria-label="Open Live Chat Support"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-800"></span>
            </div>
            <span className="text-xs font-extrabold tracking-wide whitespace-nowrap">
              Live Chat Support
            </span>

            {/* Unread indicator */}
            {unreadCount > 0 && (
              <span className="w-5 h-5 bg-amber-400 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

    </div>
  );
};
