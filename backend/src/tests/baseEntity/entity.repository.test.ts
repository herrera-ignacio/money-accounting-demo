import * as sinon from 'sinon';
import { BaseEntity } from '../../entities/base.entity';
import { EntityDto } from '../../entities/entity.dto';
import { EntityRepository } from '../../entities/entity.repository';
import { mockBaseEntity } from '../fixtures';

describe('Entity / Repository', () => {
  const sandbox = sinon.createSandbox();

  const baseEntityMock = mockBaseEntity();

  afterEach(() => {
    sandbox.restore();
  });

  describe('Entity / Repository / Read', () => {
    describe('One entity saved', () => {
      const entityRepository = new EntityRepository<BaseEntity, EntityDto>();

      entityRepository.saveEntity(baseEntityMock);

      const savedEntity = entityRepository.get()[0];

      it('Read all', () => {
        const find = sandbox.spy(EntityRepository.prototype, 'find');

        const transformMany = sandbox.spy(EntityRepository.prototype, 'transformMany');

        const res = entityRepository.get();

        expect(res).toEqual([baseEntityMock]);
        expect(find.calledOnce).toBe(true);
        expect(transformMany.calledOnce).toBe(true);
      });

      it('Read by id', () => {
        const findById = sandbox.spy(EntityRepository.prototype, 'findById');

        const transform = sandbox.spy(EntityRepository.prototype, 'transform');

        const res = entityRepository.getById(savedEntity.uuid);

        expect(res).toEqual(savedEntity);
        expect(findById.calledOnce).toBe(true);
        expect(findById.getCall(0).args[0]).toEqual(savedEntity.uuid);
        expect(transform.calledOnce).toBe(true);
      });
    });

    describe('Empty dataset', () => {
      const entityRepository = new EntityRepository<BaseEntity, EntityDto>();

      it('Read by id', () => {
        const falseId = '1234';

        const findById = sandbox.spy(EntityRepository.prototype, 'findById');

        const transform = sandbox.spy(EntityRepository.prototype, 'transform');

        const res = entityRepository.getById(falseId);

        expect(res).toEqual(undefined);
        expect(findById.calledOnce).toBe(true);
        expect(findById.getCall(0).args[0]).toEqual(falseId);
        expect(transform.calledOnce).toBe(false);
      });
    });
  });

  describe('Entity / Repository / Create', () => {
    const entityRepository = new EntityRepository<BaseEntity, EntityDto>();

    it('Create one', () => {
      const create = sandbox.spy(EntityRepository.prototype, 'create');

      const transform = sandbox.spy(EntityRepository.prototype, 'transform');

      const res = entityRepository.saveEntity(baseEntityMock);

      expect(res).toEqual(entityRepository.get()[0]);
      expect(create.calledOnce).toBe(true);
      expect(create.getCall(0).args[0]).toEqual(baseEntityMock);
      expect(transform.calledTwice).toBe(true);
    });
  });

  describe('Entity / Repository / Update', () => {
    describe('One entity saved', () => {
      const entityRepository = new EntityRepository<BaseEntity, EntityDto>();

      entityRepository.saveEntity(baseEntityMock);

      const savedEntity = entityRepository.get()[0];

      it('Update one', () => {
        const update = sandbox.spy(EntityRepository.prototype, 'update');

        const transform = sandbox.spy(EntityRepository.prototype, 'transform');

        const res = entityRepository.updateEntity(savedEntity);

        expect(res).toEqual(entityRepository.get()[0]);
        expect(update.calledOnce).toBe(true);
        expect(update.getCall(0).args[0]).toEqual(savedEntity);
        expect(transform.calledTwice).toBe(true);
      });
    });

    describe('Empty dataset', () => {
      const entityRepository = new EntityRepository<BaseEntity, EntityDto>();

      it('Update one', () => {
        const update = sandbox.spy(EntityRepository.prototype, 'update');

        const transform = sandbox.spy(EntityRepository.prototype, 'transform');

        const res = entityRepository.updateEntity(baseEntityMock);

        expect(res).toEqual(undefined);
        expect(update.calledOnce).toBe(true);
        expect(update.getCall(0).args[0]).toEqual(baseEntityMock);
        expect(transform.called).toBe(false);
      });
    });
  });

  describe('Entity / Repository / Delete', () => {
    describe('Entity exists', () => {
      const entityRepository = new EntityRepository<BaseEntity, EntityDto>();

      entityRepository.saveEntity(baseEntityMock);

      const savedEntity = entityRepository.get()[0];

      it('Delete one succeeds', () => {
        const res = entityRepository.delete(savedEntity.uuid);

        expect(res).toEqual({ success: true });
      });
    });

    describe('Entity does not exist', () => {
      const entityRepository = new EntityRepository<BaseEntity, EntityDto>();

      it('Delete one fails', () => {
        const res = entityRepository.delete('1234');

        expect(res).toEqual({ success: false });
      });
    });
  });
});
