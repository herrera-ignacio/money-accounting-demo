/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sinon from 'sinon';
import { Response, Request } from 'express';
import { RequestWithIdParam, RequestWithRepositoryQuery, RequestWithUpdateBody } from '../../common/interfaces';
import { BaseEntity } from '../../entities/base.entity';
import { EntityRepository } from '../../entities/entity.repository';
import { EntityService } from '../../entities/entity.service';
import { EntityController } from '../../entities/entity.controller';
import { mockBaseEntity } from '../fixtures';

describe('Entity / Controller', () => {
  const sandbox = sinon.createSandbox();

  const baseEntityMock = mockBaseEntity();

  const entityRepository = new EntityRepository();

  const entityService = new EntityService(entityRepository, BaseEntity);

  const entityController = new EntityController(entityService);

  const resSpy = {
    json: sinon.spy(function json(_json: JSON) { return this; }),
    status: sinon.spy(function status(_code: number) { return this; }),
    send: sinon.spy(function text(_text: string) { return this; }),
  };

  const nextSpy = sinon.spy(() => null);

  afterEach(() => {
    resSpy.json.resetHistory();
    resSpy.status.resetHistory();
    resSpy.send.resetHistory();
    nextSpy.resetHistory();
    sandbox.restore();
  });

  describe('Entity / Controller / Get', () => {
    it('Get all', async () => {
      const get = sandbox.spy(() => ([baseEntityMock]));

      sandbox.replace(EntityService.prototype, 'get', get);

      entityController.get(
        {} as RequestWithRepositoryQuery,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(get.calledOnce).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(200);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: [baseEntityMock] });
    });

    it('Get by id', async () => {
      const getById = sandbox.spy((_id: string) => baseEntityMock);

      sandbox.replace(EntityService.prototype, 'getById', getById);

      entityController.getById(
        { params: { uuid: baseEntityMock.uuid } } as unknown as RequestWithIdParam,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(getById.calledOnce).toBe(true);
      expect(getById.getCall(0).args[0]).toEqual(baseEntityMock.uuid);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(200);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: baseEntityMock });
    });
  });

  describe('Entity / Controller / Post', () => {
    it('Create one', async () => {
      const create = sandbox.spy((_input: Partial<BaseEntity>) => baseEntityMock);

      sandbox.replace(EntityService.prototype, 'create', create);

      entityController.create(
        { body: baseEntityMock } as unknown as Request,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(create.calledOnce).toBe(true);
      expect(create.getCall(0).args[0]).toEqual(baseEntityMock);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(201);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: baseEntityMock });
    });
  });

  describe('Entity / Controller / Put', () => {
    it('Update one', async () => {
      const update = sandbox.spy((_input: Partial<BaseEntity>) => baseEntityMock);

      sandbox.replace(EntityService.prototype, 'update', update);

      entityController.update(
        { body: baseEntityMock } as unknown as RequestWithUpdateBody<BaseEntity>,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(update.calledOnce).toBe(true);
      expect(update.getCall(0).args[0]).toEqual(baseEntityMock);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(200);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: baseEntityMock });
    });
  });

  describe('Entity / Controller / Delete', () => {
    it('Update user', async () => {
      const deleteSpy = sandbox.spy((_id: string) => ({ success: true }));

      sandbox.replace(EntityService.prototype, 'delete', deleteSpy);

      entityController.delete(
        { params: { uuid: baseEntityMock.uuid } } as unknown as Request,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(deleteSpy.calledOnce).toBe(true);
      expect(deleteSpy.getCall(0).args[0]).toEqual(baseEntityMock.uuid);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(204);
      expect(resSpy.send.calledOnce).toBe(true);
      expect(resSpy.send.getCall(0).args[0]).toBeUndefined();
    });
  });
});
