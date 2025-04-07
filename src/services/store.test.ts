import { rootReducer } from './store';

describe('Тестирование store', () => {
	it('возвращает начальное состояние при неизвестном типе действия', () => {
		const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

		expect(initialState).toEqual({
			ingredients: {
				ingredients: [],
				isLoading: false,
				status: 'idle',
				error: null
			},
			feed: {
				orders: [],
				total: null,
				totalToday: null,
				isLoading: false,
				status: 'idle',
				error: null
			},
			user: {
				user: null,
				isAuthChecked: false,
				isAuthenticated: false,
				isLoading: false,
				status: 'idle',
				orders: null,
				error: null
			},
			order: {
				bun: null,
				ingredients: [],
				isLoading: false,
				status: 'idle',
				orderModalData: null,
				error: null
			}
		});
	});
});
