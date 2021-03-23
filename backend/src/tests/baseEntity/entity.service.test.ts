/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sinon from 'sinon';
import { BaseEntity } from '../../entities/base.entity';
import { EntityRepository } from '../../entities/entity.repository';
import { EntityService } from '../../entities/entity.service';
import { NotFoundException } from '../../common/exceptions';
import { mockBaseEntity } from '../fixtures';

describe('Entity / Service', () => {
  const sandbox = sinon.createSandbox();

  const baseEntityMock = mockBaseEntity();

  const entityRepository = new EntityRepository();

  const entityService = new EntityService(entityRepository, BaseEntity);

  const getRepositorySpy = sinon.spy(() => entityRepository);

  beforeEach(() => {
    getRepositorySpy.resetHistory();
    sandbox.replace(EntityService.prototype, 'getRepository' as any, getRepositorySpy);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Entity / Service / Read', () => {
    it('Read all', () => {
      const get = sandbox.spy(() => [baseEntityMock]);

      sandbox.replace(EntityRepository.prototype, 'get', get);

      const resSpy = entityService.get();

      expect(resSpy).toEqual([baseEntityMock]);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(get.calledOnce).toBe(true);
    });

    it('Read by uuid', () => {
      const getById = sandbox.spy((_id: string) => baseEntityMock);

      sandbox.replace(EntityRepository.prototype, 'getById', getById);

      const resSpy = entityService.getById(baseEntityMock.uuid);

      expect(resSpy).toEqual(baseEntityMock);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(getById.calledOnce).toBe(true);
      expect(getById.getCall(0).args[0]).toEqual(baseEntityMock.uuid);
    });

    it('Read by invalid uuid throws', () => {
      const getById = sandbox.spy((_id: string) => undefined);

      sandbox.replace(EntityRepository.prototype, 'getById', getById);

      expect(() => entityService.getById('0')).toThrow(NotFoundException);

      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(getById.calledOnce).toBe(true);
    });
  });

  describe('Entity / Service / Create', () => {
    it('Create one', () => {
      const saveEntity = sandbox.spy((_input?: Partial<BaseEntity>) => baseEntityMock);

      sandbox.replace(EntityRepository.prototype, 'saveEntity', saveEntity);

      const resSpy = entityService.create(baseEntityMock);

      expect(resSpy).toEqual(baseEntityMock);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(saveEntity.calledOnce).toBe(true);
    });
  });

  describe('Entity / Service / Update', () => {
    it('Update one', () => {
      const updateEntity = sandbox.spy(
        (_input: Partial<BaseEntity>) => baseEntityMock,
      );

      sandbox.replace(EntityRepository.prototype, 'updateEntity', updateEntity);

      const resSpy = entityService.update(baseEntityMock);

      expect(resSpy).toEqual(baseEntityMock);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(updateEntity.calledOnce).toBe(true);
      expect(updateEntity.getCall(0).args[0]).toEqual(baseEntityMock);
    });
  });

  describe('Entity / Service / Delete', () => {
    it('Delete by id', () => {
      const deleteEntity = sandbox.spy((_id: string) => ({ success: true }));

      sandbox.replace(EntityRepository.prototype, 'delete', deleteEntity);

      const resSpy = entityService.delete(baseEntityMock.uuid);

      expect(resSpy).toEqual(undefined);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(deleteEntity.calledOnce).toBe(true);
      expect(deleteEntity.getCall(0).args[0]).toEqual(baseEntityMock.uuid);
    });

    it('Delete with invalid id throws', () => {
      const invalidId = '0';

      const deleteEntity = sandbox.spy((_id: string) => ({ success: false }));

      sandbox.replace(EntityRepository.prototype, 'delete', deleteEntity);

      expect(() => entityService.delete(invalidId)).toThrow(NotFoundException);

      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(deleteEntity.calledOnce).toBe(true);
      expect(deleteEntity.getCall(0).args[0]).toEqual(invalidId);
    });
  });
});
