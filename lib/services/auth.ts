import { getDatabase } from '@/lib/database/connection';
import { UserAdmin, UserClient } from '@/lib/models/user';

export class AuthService {
  private static async getDb() {
    return await getDatabase();
  }

  static async createAdminUser(userData: Omit<UserAdmin, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserAdmin> {
    const db = await this.getDb();
    const admin = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('admins').insertOne(admin);
    return admin;
  }

  static async createClientUser(userData: Omit<UserClient, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserClient> {
    const db = await this.getDb();
    const client = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('clients').insertOne(client);
    return client;
  }

  static async authenticateAdmin(username: string, password: string): Promise<UserAdmin | null> {
    const db = await this.getDb();
    const admin = await db.collection('admins').findOne({ username, password });
    return admin as UserAdmin | null;
  }

  static async authenticateClient(username: string, password: string): Promise<UserClient | null> {
    const db = await this.getDb();
    const client = await db.collection('clients').findOne({ username, password });
    return client as UserClient | null;
  }

  static async verifySecurityCode(code: string): Promise<boolean> {
    return code === 'VMSTUDIO2024';
  }

  static async getAllClients(): Promise<UserClient[]> {
    const db = await this.getDb();
    const clients = await db.collection('clients').find({}).toArray();
    return clients as UserClient[];
  }

  static async getClientById(id: string): Promise<UserClient | null> {
    const db = await this.getDb();
    const client = await db.collection('clients').findOne({ id });
    return client as UserClient | null;
  }

  static async updateClient(id: string, updateData: Partial<UserClient>): Promise<UserClient | null> {
    const db = await this.getDb();
    const updatedClient = await db.collection('clients').findOneAndUpdate(
      { id },
      { $set: { ...updateData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return updatedClient as UserClient | null;
  }

  static async deleteClient(id: string): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.collection('clients').deleteOne({ id });
    return result.deletedCount === 1;
  }
}