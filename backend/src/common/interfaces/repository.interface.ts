import { RepositoryQuery } from './repositoryQuery.interface';

export interface IRepository<T extends Record<string, any>> {
  /**
   * Create and save entity to DAO.
   */
  create(entity: Omit<T, 'uuid'|'createdAt'>): T;

  /**
   * Update if found and save to DAO.
   */
  update(entity: { uuid: string } & Partial<T>): T | undefined;

  /**
   * Get matching entities.
   */
  find(options?: RepositoryQuery): T[];

  /**
   * Get entity by matching id if any.
   */
  findById(id: string): T | undefined;

  /**
   * Delete entity by matching id if any.
   */
  delete(id: string): { success: boolean };
}
