export interface UserAdmin {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  bio: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserClient {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  paymentStatus: 'pending' | 'partial' | 'paid';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Admin ID
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  estimatedDelivery: Date;
  userId: string; // Client ID
  progress: number;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  totalAmount: number;
  paidAmount: number;
  previewUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  projectId: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string; // Admin ID
  completedBy?: string; // Admin ID
  completedAt?: Date;
  notifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  projectId: string;
  userId: string;
  userType: 'admin' | 'client';
  isRead: boolean;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'task_progress' | 'task_completed' | 'payment_reminder' | 'general';
  userId: string;
  userType: 'admin' | 'client';
  projectId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: 'maintenance' | 'support' | 'advertising';
  price: number;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}