import { chatsReducer, initialState } from './chats.reducer';

describe('Chats Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = chatsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
