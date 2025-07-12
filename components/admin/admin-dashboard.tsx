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
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

export function AdminDashboard() {
  const [clients, setClients] = useState([
    { id: 1, name: 'TechCorp Inc.' },
    { id: 2, name: 'StartupXYZ' },
    { id: 3, name: 'LocalBiz' },
  ]);

  const [recentProjects, setRecentProjects] = useState([
    {
      id: 1,
      name: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      progress: 75,
      status: 'In Progress',
      dueDate: '2024-02-15',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      client: 'StartupXYZ',
      progress: 45,
      status: 'In Progress',
      dueDate: '2024-02-28',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Website Optimization',
      client: 'LocalBiz',
      progress: 90,
      status: 'Review',
      dueDate: '2024-01-30',
      priority: 'Low'
    }
  ]);

  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    startDate: '',
    endDate: ''
  });

  const [newClient, setNewClient] = useState({
    name: '',
    business: '',
    date: '',
    notes: ''
  });

  const [reminder, setReminder] = useState({
    client: '',
    type: '',
    message: ''
  });

  const handleAddProject = () => {
    const newEntry = {
      id: recentProjects.length + 1,
      name: newProject.name,
      client: newProject.client,
      progress: 0,
      status: 'Not started',
      dueDate: newProject.endDate,
      priority: 'Medium'
    };
    setRecentProjects([...recentProjects, newEntry]);
    setNewProject({ name: '', client: '', startDate: '', endDate: '' });
  };

  const handleAddClient = () => {
    const newEntry = {
      id: clients.length + 1,
      name: newClient.name
    };
    setClients([...clients, newEntry]);
    setNewClient({ name: '', business: '', date: '', notes: '' });
  };

  const handleSendReminder = () => {
    alert(`Recordatorio enviado a ${reminder.client} con tipo "${reminder.type}" y mensaje: "${reminder.message}"`);
    setReminder({ client: '', type: '', message: '' });
  };

  const stats = [
    {
      title: 'Total Clients',
      value: clients.length.toString(),
      change: '+2 this month',
      icon: Users
    },
    {
      title: 'Active Projects',
      value: recentProjects.length.toString(),
      change: '+3 this week',
      icon: FolderOpen
    },
    {
      title: 'Completed Tasks',
      value: '89',
      change: '+12 today',
      icon: CheckCircle
    },
    {
      title: 'Revenue',
      value: '$45,280',
      change: '+8% from last month',
      icon: DollarSign
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Task completed',
      project: 'E-commerce Platform',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Payment received',
      project: 'Mobile App Redesign',
      time: '4 hours ago',
      type: 'info'
    },
    {
      id: 3,
      action: 'Client message',
      project: 'Website Optimization',
      time: '1 day ago',
      type: 'warning'
    }
  ];

  return (
    <div className="space-y-6 bg-black min-h-screen text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Panel de Administrador</h1>
        <Badge variant="outline" className="border-[#0049FF] text-white">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Sistema Online
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-[#0049FF] bg-[#111] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-[#0049FF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center px-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#0049FF] hover:bg-[#003ECC] text-white py-6 text-base font-semibold">
              <Users className="mr-2 h-5 w-5" />
              Añadir Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#111] text-white border border-white">
            <DialogHeader>
              <DialogTitle>Agregar nuevo cliente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Cliente</Label>
                <Input id="name" placeholder="Ej: Juan Pérez" className="bg-black text-white mt-1" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="business">Tipo de Negocio</Label>
                <Input id="business" placeholder="Ej: Tienda online de ropa" className="bg-black text-white mt-1" value={newClient.business} onChange={(e) => setNewClient({ ...newClient, business: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="date">Fecha de reunión</Label>
                <Input id="date" type="date" className="bg-black text-white mt-1" value={newClient.date} onChange={(e) => setNewClient({ ...newClient, date: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="notes">Anotaciones</Label>
                <Textarea id="notes" placeholder="Ej: Necesita una tienda moderna con pasarela de pagos..." className="bg-black text-white mt-1" value={newClient.notes} onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button className="mt-4 bg-[#0049FF] hover:bg-[#003ECC] text-white" onClick={handleAddClient}>Guardar Cliente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#0049FF] hover:bg-[#003ECC] text-white py-6 text-base font-semibold">
              <FolderOpen className="mr-2 h-4 w-4" />
              Proyecto Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#111] text-white border border-white">
            <DialogHeader>
              <DialogTitle>Nuevo Proyecto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Nombre del Proyecto</Label>
                <Input id="project-name" placeholder="Ej: Plataforma de reservas" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="bg-black text-white mt-1" />
              </div>
              <div>
                <Label htmlFor="start-date">Inicio</Label>
                <Input id="start-date" type="date" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} className="bg-black text-white mt-1" />
              </div>
              <div>
                <Label htmlFor="end-date">Fin</Label>
                <Input id="end-date" type="date" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} className="bg-black text-white mt-1" />
              </div>
              <div>
                <Label htmlFor="client">Cliente</Label>
                <select id="client" value={newProject.client} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} className="bg-black text-white mt-1 w-full border border-white rounded-md px-3 py-2">
                  <option value="">Seleccionar cliente...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button className="mt-4 bg-[#0049FF] hover:bg-[#003ECC] text-white" onClick={handleAddProject}>
                Crear Proyecto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#0049FF] hover:bg-[#003ECC] text-white py-6 text-base font-semibold">
              <AlertCircle className="mr-2 h-5 w-5" />
              Mandar Recordatorio
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#111] text-white border border-white">
            <DialogHeader>
              <DialogTitle>Enviar Recordatorio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="client-reminder">Cliente</Label>
                <select id="client-reminder" value={reminder.client} onChange={(e) => setReminder({ ...reminder, client: e.target.value })} className="bg-black text-white mt-1 w-full border border-white rounded-md px-3 py-2">
                  <option value="">Seleccionar cliente...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="notification-type">Tipo de Notificación</Label>
                <select id="notification-type" value={reminder.type} onChange={(e) => setReminder({ ...reminder, type: e.target.value })} className="bg-black text-white mt-1 w-full border border-white rounded-md px-3 py-2">
                  <option value="">Seleccionar tipo...</option>
                  <option value="Avances en proceso">Avances en proceso</option>
                  <option value="Avances terminados">Avances terminados</option>
                </select>
              </div>
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Detalle adicional..." value={reminder.message} onChange={(e) => setReminder({ ...reminder, message: e.target.value })} className="bg-black text-white mt-1" />
              </div>
            </div>
            <DialogFooter>
              <Button className="mt-4 bg-[#0049FF] hover:bg-[#003ECC] text-white" onClick={handleSendReminder}>Enviar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proyectos Recientes */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-white bg-[#111] text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FolderOpen className="h-5 w-5 text-[#0049FF]" />
              Proyectos Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.client}</p>
                  </div>
                  <Badge
                    variant={project.priority === 'High' ? 'destructive' :
                      project.priority === 'Medium' ? 'default' : 'secondary'}
                  >
                    {project.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-sm text-gray-400">{project.progress}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{project.status}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {project.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividades */}
        <Card className="border border-white bg-[#111] text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-[#0049FF]" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-[#0049FF]' :
                  'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.project}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
