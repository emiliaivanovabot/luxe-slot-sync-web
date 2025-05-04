
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, MessageCircle } from "lucide-react";

const Assistant: React.FC = () => {
  const { currentModel } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Array<{type: 'assistant' | 'user', content: string}>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get next appointment (this would normally come from real data)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDate = tomorrow.toLocaleDateString('de-DE');
  
  // Add welcome message when component mounts
  useEffect(() => {
    if (currentModel && messages.length === 0) {
      setMessages([
        { 
          type: 'assistant', 
          content: `Hallo ${currentModel.name}, dein nächstes Shooting ist am ${nextDate} um 17 Uhr.`
        }
      ]);
    }
  }, [currentModel, messages.length, nextDate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    
    // Simulate assistant response (in a real app, this would call an API)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: "Ich habe deine Nachricht erhalten und werde dir bald antworten!" 
      }]);
    }, 1000);
    
    setInputMessage("");
  };
  
  if (!currentModel) return null;
  
  // Floating button to reopen chat if closed
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-luxury-black shadow-lg flex items-center justify-center p-0 hover:bg-luxury-black/90"
        aria-label="Open Assistant"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }
  
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md px-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl border border-luxury-beige p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4 border-b border-luxury-beige/30 pb-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-luxury-black" />
            <h3 className="font-serif text-lg font-medium text-luxury-black">Assistent</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-transparent hover:opacity-70"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Message container with max height and scroll */}
        <div className="max-h-64 overflow-y-auto mb-3 space-y-3 pr-1">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${
                message.type === 'assistant' 
                  ? "bg-luxury-lightgray/50" 
                  : "bg-luxury-beige/20 ml-4"
              } rounded-lg p-3`}
            >
              <p className={`text-sm ${message.type === 'user' ? "text-luxury-black" : "text-luxury-gray"}`}>
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Deine Frage..."
            className="min-h-[44px] resize-none text-sm"
            maxLength={500}
          />
          <Button 
            type="submit" 
            size="icon"
            className="h-[44px] bg-luxury-black hover:bg-luxury-black/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Assistant;
