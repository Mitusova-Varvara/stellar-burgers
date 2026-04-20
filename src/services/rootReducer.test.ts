import { rootReducer } from './store';

describe('rootReducer', () => {
  it('проверяем правильную настройку и работу rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      user: expect.any(Object),
      ingredients: expect.any(Object),
      order: expect.any(Object)
    });
  });
});
