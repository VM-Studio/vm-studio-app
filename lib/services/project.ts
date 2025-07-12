import { getDatabase } from '@/lib/database/connection';
import { Project, ChecklistItem, Comment } from '@/lib/models/user';

export class ProjectService {
  private static async getDb() {
    return await getDatabase();
  }

  static async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const db = await this.getDb();
    const project = {
      ...projectData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('projects').insertOne(project);
    return project;
  }

  static async getAllProjects(): Promise<Project[]> {
    const db = await this.getDb();
    const projects = await db.collection('projects').find({}).toArray();
    return projects as Project[];
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const db = await this.getDb();
    const project = await db.collection('projects').findOne({ id });
    return project as Project | null;
  }

  static async getProjectsByClientId(userId: string): Promise<Project[]> {
    const db = await this.getDb();
    const projects = await db.collection('projects').find({ userId }).toArray();
    return projects as Project[];
  }

  static async updateProject(id: string, updateData: Partial<Project>): Promise<Project | null> {
    const db = await this.getDb();
    const updatedProject = await db.collection('projects').findOneAndUpdate(
      { id },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return updatedProject as Project | null;
  }

  static async deleteProject(id: string): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.collection('projects').deleteOne({ id });
    return result.deletedCount === 1;
  }

  static async createChecklistItem(itemData: Omit<ChecklistItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChecklistItem> {
    const db = await this.getDb();
    const item = {
      ...itemData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('checklistItems').insertOne(item);
    return item;
  }

  static async getChecklistItemsByProjectId(projectId: string): Promise<ChecklistItem[]> {
    const db = await this.getDb();
    const items = await db.collection('checklistItems').find({ projectId }).toArray();
    return items as ChecklistItem[];
  }

  static async updateChecklistItem(id: string, updateData: Partial<ChecklistItem>): Promise<ChecklistItem | null> {
    const db = await this.getDb();
    const updatedItem = await db.collection('checklistItems').findOneAndUpdate(
      { id },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return updatedItem as ChecklistItem | null;
  }

  static async createComment(commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
    const db = await this.getDb();
    const comment = {
      ...commentData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('comments').insertOne(comment);
    return comment;
  }

  static async getCommentsByProjectId(projectId: string): Promise<Comment[]> {
    const db = await this.getDb();
    const comments = await db.collection('comments').find({ projectId }).toArray();
    return comments as Comment[];
  }

  static async updateComment(id: string, updateData: Partial<Comment>): Promise<Comment | null> {
    const db = await this.getDb();
    const updatedComment = await db.collection('comments').findOneAndUpdate(
      { id },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return updatedComment as Comment | null;
  }

  static async calculateProjectProgress(projectId: string): Promise<number> {
    const db = await this.getDb();
    const items = await db.collection('checklistItems').find({ projectId }).toArray();
    
    if (items.length === 0) return 0;
    
    const completedItems = items.filter(item => item.status === 'completed').length;
    return Math.round((completedItems / items.length) * 100);
  }
}