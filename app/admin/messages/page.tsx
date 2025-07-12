// AdminDashboard.tsx
'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  FolderOpen,
  CheckCircle,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

export function AdminDashboard() {
  const [clients, setClients] = useState<{ id: number, name: string }[]>([
    { id: 1, name: 'TechCorp Inc.' },
    { id: 2, name: 'StartupXYZ' },
    { id: 3, name: 'LocalBiz' },
  ]);

  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const [messages, setMessages] = useState<Record<string, { text: string, time: string, sender: string }[]>>({
    'TechCorp Inc.': [
      { text: '¡Recordatorio enviado con éxito!', time: '10:00 AM', sender: 'me' },
      { text: 'Gracias por la actualización.', time: '10:05 AM', sender: 'client' },
    ],
    'StartupXYZ': [],
    'LocalBiz': []
  });

  const [newMessage, setNewMessage] = useState<string>('');

  const openChatWithClient = (clientName: string) => {
    setSelectedClient(clientName);
    setChatOpen(true);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedClient) return;
    const newMsg = { text: newMessage, time: 'Ahora', sender: 'me' };
    setMessages(prev => ({
      ...prev,
      [selectedClient]: [...(prev[selectedClient] || []), newMsg]
    }));
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de clientes */}
        <div className="bg-[#111] border border-[#0049FF] rounded-xl p-4 space-y-4 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-white mb-2">Clientes</h2>
          <div className="space-y-2">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => openChatWithClient(client.name)}
                className={`w-full text-left px-4 py-2 rounded-lg ${selectedClient === client.name ? 'bg-[#0049FF]' : 'bg-[#222]'} text-white hover:bg-[#003ECC]`}
              >
                {client.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Modal */}
        {chatOpen && selectedClient && (
          <div className="lg:col-span-2 flex flex-col bg-[#111] border border-[#0049FF] rounded-xl h-[80vh]">
            {/* Header del chat */}
            <div className="p-4 border-b border-[#222]">
              <h2 className="text-xl font-bold">Chat con {selectedClient}</h2>
              <p className="text-sm text-gray-400">Último mensaje hoy</p>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(messages[selectedClient] || []).map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs ${msg.sender === 'me' ? 'bg-[#0049FF]' : 'bg-[#222]'} text-white rounded-lg px-4 py-2 text-sm`}>
                    {msg.text}
                    <div className={`text-${msg.sender === 'me' ? 'right' : 'left'} text-[11px] text-gray-400 mt-1`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Campo de entrada */}
            <div className="p-4 border-t border-[#222] flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-black text-white border border-[#0049FF] rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-[#0049FF] hover:bg-[#003ECC] text-white px-4 py-2 rounded-lg font-medium"
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AdminDashboard;
