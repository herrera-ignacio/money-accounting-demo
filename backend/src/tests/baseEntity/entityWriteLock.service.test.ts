/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sinon from 'sinon';
import { BaseEntity } from '../../entities/base.entity';
import { EntityRepository } from '../../entities/entity.repository';
import { EntityWriteLockService } from '../../entities/entityWriteLock.service';
import { LockedException } from '../../common/exceptions';
import { mockBaseEntity } from '../fixtures';

describe('EntityWriteLock / Service', () => {
  const sandbox = sinon.createSandbox();

  const baseEntityMock = mockBaseEntity();

  const entityRepository = new EntityRepository();

  const entityWriteLockService = new EntityWriteLockService(entityRepository, BaseEntity);

  const getRepositorySpy = sinon.spy(() => entityRepository);

  beforeEach(() => {
    sandbox.replace(EntityWriteLockService.prototype, 'getRepository' as any, getRepositorySpy);
    getRepositorySpy.resetHistory();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Entity / Service / Read', () => {
    describe('One entity saved', () => {
      describe('No lock', () => {
        it('Read all', () => {
          EntityWriteLockService.releaseLock();

          const get = sandbox.spy(() => [baseEntityMock]);

          sandbox.replace(EntityRepository.prototype, 'get', get);

          const validateLock = sandbox.spy(EntityWriteLockService.prototype, 'validateLock');

          const resSpy = entityWriteLockService.get();

          expect(resSpy).toEqual([baseEntityMock]);
          expect(validateLock.calledOnce).toBe(true);
          expect(getRepositorySpy.calledOnce).toBe(true);
          expect(get.calledOnce).toBe(true);
        });

        it('Read by uuid', () => {
          EntityWriteLockService.releaseLock();

          const getById = sandbox.spy((_id: string) => baseEntityMock);

          sandbox.replace(EntityRepository.prototype, 'getById', getById);

          const validateLock = sandbox.spy(EntityWriteLockService.prototype, 'validateLock');

          const resSpy = entityWriteLockService.getById(baseEntityMock.uuid);

          expect(resSpy).toEqual(baseEntityMock);
          expect(validateLock.called).toBe(true);
          expect(getRepositorySpy.calledOnce).toBe(true);
          expect(getById.calledOnce).toBe(true);
          expect(getById.getCall(0).args[0]).toEqual(baseEntityMock.uuid);
        });
      });

      describe('Locked', () => {
        it('Read all throws', () => {
          EntityWriteLockService.lock();
          expect(() => { entityWriteLockService.get(); }).toThrow(LockedException);
          expect(getRepositorySpy.called).toBe(false);
        });

        it('Read by id throws', () => {
          EntityWriteLockService.lock();
          expect(
            () => { entityWriteLockService.getById(baseEntityMock.uuid); },
          ).toThrow(LockedException);
          expect(getRepositorySpy.called).toBe(false);
        });
      });
    });
  });

  describe('Entity / Service / Create', () => {
    describe('No lock', () => {
      it('Create one', () => {
        EntityWriteLockService.releaseLock();

        const validateLock = sandbox.spy(EntityWriteLockService.prototype, 'validateLock');

        const lock = sandbox.spy(EntityWriteLockService, 'lock');

        const releaseLock = sandbox.spy(EntityWriteLockService, 'releaseLock');

        const saveEntity = sandbox.spy((_input?: Partial<BaseEntity>) => baseEntityMock);

        sandbox.replace(EntityRepository.prototype, 'saveEntity', saveEntity);

        const resSpy = entityWriteLockService.create(baseEntityMock);

        expect(resSpy).toEqual(baseEntityMock);
        expect(validateLock.calledOnce).toBe(true);
        expect(validateLock.calledBefore(lock)).toBe(true);
        expect(lock.calledOnce).toBe(true);
        expect(lock.calledBefore(saveEntity)).toBe(true);
        expect(getRepositorySpy.calledOnce).toBe(true);
        expect(saveEntity.calledOnce).toBe(true);
        expect(releaseLock.calledOnce).toBe(true);
        expect(releaseLock.calledAfter(saveEntity)).toBe(true);
      });
    });

    describe('Locked', () => {
      it('Create one throws', () => {
        EntityWriteLockService.lock();

        const validateLock = sandbox.spy(EntityWriteLockService.prototype, 'validateLock');

        expect(() => entityWriteLockService.create(baseEntityMock)).toThrow(LockedException);
        expect(validateLock.calledOnce).toBe(true);
        expect(getRepositorySpy.called).toBe(false);
      });
    });
  });
});
