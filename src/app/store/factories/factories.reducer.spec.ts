import { Mocks, ItemId } from 'src/tests';
import { LoadAction, ResetAction } from '../app.actions';
import * as Actions from './factories.actions';
import { factoriesReducer, initialFactoriesState } from './factories.reducer';

describe('Factories Reducer', () => {
  const id = 'id';
  const value = 'value';
  const def = 'default';

  describe('LOAD', () => {
    it('should load factory settings', () => {
      const result = factoriesReducer(
        undefined,
        new LoadAction({ factoriesState: Mocks.FactorySettingsInitial } as any)
      );
      expect(result).toEqual(Mocks.FactorySettingsInitial);
    });
  });

  describe('RESET', () => {
    it('should return the initial state', () => {
      const result = factoriesReducer(null, new ResetAction());
      expect(result).toEqual(initialFactoriesState);
    });
  });

  describe('ADD', () => {
    it('should add a factory to the list', () => {
      const result = factoriesReducer(
        undefined,
        new Actions.AddAction({ value, def: [def] })
      );
      expect(result.ids).toEqual([def, value]);
    });
  });

  describe('REMOVE', () => {
    it('should remove a factory from the list', () => {
      const result = factoriesReducer(
        { ids: null, entities: { [def]: {} } } as any,
        new Actions.RemoveAction({ value: def, def: [def] })
      );
      expect(result.ids).toEqual([]);
      expect(result.entities[value]).toBeUndefined();
    });
  });

  describe('RAISE', () => {
    it('should raise the rank of a factory', () => {
      const result = factoriesReducer(
        { ids: null } as any,
        new Actions.RaiseAction({ value: def, def: [value, def] })
      );
      expect(result.ids).toEqual([def, value]);
    });

    it('should do nothing if rank is already highest', () => {
      const result = factoriesReducer(
        { ids: null } as any,
        new Actions.RaiseAction({ value, def: [value, def] })
      );
      expect(result.ids).toBeNull();
    });
  });

  describe('SET_FACTORY', () => {
    it('should replace an id in the rank list', () => {
      const result = factoriesReducer(
        { ids: null, entities: { [def]: 'test' } } as any,
        new Actions.SetFactoryAction({ id: def, value, def: [def] })
      );
      expect(result.ids).toEqual([value]);
      expect(result.entities[value]).toEqual('test' as any);
    });

    it('should do nothing if id is not found', () => {
      const result = factoriesReducer(
        { ids: null, entities: { [def]: 'test' } } as any,
        new Actions.SetFactoryAction({ id, value, def: [def] })
      );
      expect(result.ids).toBeNull();
      expect(result.entities[def]).toEqual('test' as any);
    });
  });

  describe('SET_MODULE_RANK', () => {
    it('should set the module rank for a factory', () => {
      const result = factoriesReducer(
        undefined,
        new Actions.SetModuleRankAction({ id, value: [value], def: [] })
      );
      expect(result.entities[id].moduleRank).toEqual([value]);
    });
  });

  describe('SET_BEACON_COUNT', () => {
    it('should set the beacon count for a factory', () => {
      const result = factoriesReducer(
        undefined,
        new Actions.SetBeaconCountAction({ id, value: '2', def: '8' })
      );
      expect(result.entities[id].beaconCount).toEqual('2');
    });
  });

  describe('SET_BEACON', () => {
    it('should set the beacon for a factory', () => {
      const result = factoriesReducer(
        undefined,
        new Actions.SetBeaconAction({ id, value, def: ItemId.Beacon })
      );
      expect(result.entities[id].beacon).toEqual(value);
    });
  });

  describe('SET_BEACON_MODULE', () => {
    it('should set the beacon module for a factory', () => {
      const result = factoriesReducer(
        undefined,
        new Actions.SetBeaconModuleAction({
          id,
          value,
          def: ItemId.SpeedModule,
        })
      );
      expect(result.entities[id].beaconModule).toEqual(value);
    });
  });

  describe('SET_OVERCLOCK', () => {
    it('should set the overclock for a factory', () => {
      const result = factoriesReducer(
        undefined,
        new Actions.SetOverclockAction({ id, value: 200, def: 100 })
      );
      expect(result.entities[id].overclock).toEqual(200);
    });
  });

  it('should return the default state', () => {
    expect(factoriesReducer(undefined, { type: 'Test' } as any)).toEqual(
      initialFactoriesState
    );
  });
});
