import feedReducer, { FeedState, fetchFeed, initialState } from './feedSlice';

jest.mock('@api', () => ({
	getFeedsApi: jest.fn(),
}));

describe('редьюсер ленты заказов', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('должен обрабатывать fetchFeed.pending', () => {
		const action = { type: fetchFeed.pending.type };
		const state = feedReducer(initialState, action);

		expect(state.status).toBe('loading');
		expect(state.isLoading).toBe(true);
	});

	it('должен обрабатывать fetchFeed.fulfilled', () => {
		const mockResponse = {
			orders: [
				{ _id: '1', number: 1, status: 'done' },
				{ _id: '2', number: 2, status: 'pending' },
			],
			total: 100,
			totalToday: 10,
		};

		const action = {
			type: fetchFeed.fulfilled.type,
			payload: mockResponse,
		};

		const state = feedReducer(initialState, action);

		expect(state.status).toBe('succeeded');
		expect(state.orders).toEqual(mockResponse.orders);
		expect(state.total).toBe(100);
		expect(state.totalToday).toBe(10);
		expect(state.isLoading).toBe(false);
	});

	it('должен обрабатывать fetchFeed.rejected', () => {
		const errorMessage = 'Тестовая ошибка';

		const action = {
			type: fetchFeed.rejected.type,
			error: { message: errorMessage },
		};

		const state = feedReducer(initialState, action);

		expect(state.status).toBe('failed');
		expect(state.isLoading).toBe(false);
		expect(state.error).toBe(errorMessage);
	});
});
