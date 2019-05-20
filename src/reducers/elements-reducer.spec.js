import elements from './elements-reducer';

const initial_state = [];
describe('Elements', () => {
  it('Retorna el Estado inicial de los Elementos', () => {
    expect(elements(initial_state, {})).toEqual([]);
  });
});
