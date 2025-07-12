'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  FolderOpen, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle, 
  Calendar 
} from 'lucide-react';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function ClientDashboard() {
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectData = {
    name: 'E-commerce Platform',
    description: 'Modern e-commerce solution with advanced features',
    progress: 75,
    startDate: '2024-01-15',
    estimatedDelivery: '2024-02-15',
    status: 'In Progress',
    completedTasks: 12,
    totalTasks: 16
  };

  const recentUpdates = [
    {
      id: 1,
      type: 'completed',
      title: 'User Authentication System',
      description: 'Login and registration functionality completed',
      date: '2024-01-28',
      time: '2:30 PM'
    },
    {
      id: 2,
      type: 'progress',
      title: 'Product Catalog',
      description: 'Currently working on product listing and filtering',
      date: '2024-01-27',
      time: '10:15 AM'
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Database Setup',
      description: 'All database tables and relationships established',
      date: '2024-01-25',
      time: '4:45 PM'
    }
  ];

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    toast.success('Comment submitted successfully!');
    setComment('');
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bienvenido Cliente!</h1>
          <p className="text-gray-300">Track your project progress and stay updated</p>
        </div>
        <Badge className="bg-green-900 text-green-400 border-green-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Active Project
        </Badge>
      </div>

      {/* Project Overview */}
      <Card className="border-2 border-[#0049FF] bg-[#111] text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <FolderOpen className="h-5 w-5" />
              {projectData.name}
            </CardTitle>
            <Button className="px-6 py-3 text-base gap-2 bg-[#0049FF] text-white hover:bg-[#003ECC] shadow-md">
              <ExternalLink className="h-4 w-4" />
              Vista Previa
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-300">{projectData.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{projectData.progress}%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{projectData.completedTasks}</div>
              <div className="text-sm text-gray-400">Tasks Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{projectData.totalTasks - projectData.completedTasks}</div>
              <div className="text-sm text-gray-400">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">18</div>
              <div className="text-sm text-gray-400">Days Left</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Project Progress</span>
              <span className="font-medium">{projectData.progress}%</span>
            </div>
            <Progress value={projectData.progress} className="h-3" />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Started: {projectData.startDate}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Delivery: {projectData.estimatedDelivery}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Section with Modal for Recent Updates */}
      <Card className="border border-white bg-[#111] text-white w-full">
      <CardHeader>
  <div className="flex justify-between items-center w-full">
    <CardTitle className="flex items-center gap-2 text-white">
      <MessageSquare className="h-5 w-5" />
      Leave Feedback
    </CardTitle>
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="text-white bg-[#0049FF] px-6 py-3 text-base gap-2">
          Ver actualizaciones
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#111] border border-white text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recent Updates
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {recentUpdates.map((update) => (
            <div key={update.id} className="flex gap-3 p-3 rounded-lg bg-black">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  update.type === 'completed'
                    ? 'bg-green-500'
                    : update.type === 'progress'
                    ? 'bg-blue-500'
                    : 'bg-purple-500'
                }`}
              />
              <div className="flex-1">
                <h4 className="font-medium">{update.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{update.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>{update.date}</span>
                  <span>•</span>
                  <span>{update.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  </div>
</CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            placeholder="Share your thoughts, suggestions, or questions about the project..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] bg-black text-white"
          />
          <Button
            onClick={handleCommentSubmit}
            className="w-full bg-[#0049FF] hover:bg-[#003ECC] text-white hover:shadow-[0_0_10px_#0049FF] disabled:opacity-100 disabled:bg-[#0049FF]"
            disabled={!comment.trim()}
          >
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
