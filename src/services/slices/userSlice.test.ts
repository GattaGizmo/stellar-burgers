import userReducer, {
	fetchUser,
	getOrders,
	loginUser,
	logoutUser,
	registerUser,
	updateUserDetails,
	UserState,
	initialState
} from './userSlice';

jest.mock('@api', () => ({
	registerUserApi: jest.fn(),
	loginUserApi: jest.fn(),
	logoutApi: jest.fn(),
	getUserApi: jest.fn(),
	updateUserApi: jest.fn(),
	getOrdersApi: jest.fn()
}));

describe('тесты для работы с данными пользователя', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('регистрация пользователя', () => {
		it('обрабатывает pending состояние', () => {
			const action = { type: registerUser.pending.type };
			const state = userReducer(initialState, action);

			expect(state.status).toBe('loading');
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает fulfilled состояние', () => {
			const mockUser = { name: 'Test User', email: 'test@test.com' };
			const action = {
				type: registerUser.fulfilled.type,
				payload: mockUser
			};

			const state = userReducer(initialState, action);

			expect(state.status).toBe('succeeded');
			expect(state.isLoading).toBe(false);
			expect(state.user).toEqual(mockUser);
			expect(state.isAuthenticated).toBe(true);
			expect(state.isAuthChecked).toBe(true);
		});

		it('обрабатывает rejected состояние', () => {
			const error = new Error('Тестовая ошибка');
			const action = {
				type: registerUser.rejected.type,
				error: { message: error.message }
			};

			const state = userReducer(initialState, action);

			expect(state.status).toBe('failed');
			expect(state.isLoading).toBe(false);
			expect(state.error).toBe(error.message);
			expect(state.isAuthChecked).toBe(true);
			expect(state.isAuthenticated).toBe(false);
		});
	});

	describe('авторизация пользователя', () => {
		it('обрабатывает pending состояние', () => {
			const action = { type: loginUser.pending.type };
			const state = userReducer(initialState, action);

			expect(state.status).toBe('loading');
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает fulfilled состояние', () => {
			const mockUser = { name: 'Test User', email: 'test@test.com' };
			const action = {
				type: loginUser.fulfilled.type,
				payload: mockUser
			};

			const state = userReducer(initialState, action);

			expect(state.status).toBe('succeeded');
			expect(state.isLoading).toBe(false);
			expect(state.user).toEqual(mockUser);
			expect(state.isAuthenticated).toBe(true);
			expect(state.isAuthChecked).toBe(true);
		});

		it('обрабатывает rejected состояние', () => {
			const error = new Error('Тестовая ошибка');
			const action = {
				type: loginUser.rejected.type,
				error: { message: error.message }
			};

			const state = userReducer(initialState, action);

			expect(state.status).toBe('failed');
			expect(state.isLoading).toBe(false);
			expect(state.error).toBe(error.message);
			expect(state.isAuthChecked).toBe(true);
			expect(state.isAuthenticated).toBe(false);
		});
	});

	describe('разлогинивание пользователя', () => {
		it('обрабатывает pending состояние', () => {
			const action = { type: logoutUser.pending.type };
			const state = userReducer(initialState, action);

			expect(state.isLoading).toBe(true);
			expect(state.status).toBe('loading');
		});

		it('обрабатывает fulfilled состояние', () => {
			const action = { type: logoutUser.fulfilled.type };
			const state = userReducer(initialState, action);

			expect(state.user).toBeNull();
			expect(state.isAuthenticated).toBe(false);
			expect(state.isAuthChecked).toBe(true);
			expect(state.status).toBe('succeeded');
			expect(state.isLoading).toBe(false);
		});

		it('обрабатывает rejected состояние', () => {
			const error = new Error('Тестовая ошибка');
			const action = {
				type: logoutUser.rejected.type,
				error: { message: error.message }
			};

			const state = userReducer(initialState, action);

			expect(state.error).toBe(error.message);
			expect(state.isLoading).toBe(false);
			expect(state.status).toBe('failed');
			expect(state.isAuthenticated).toBe(false);
			expect(state.isAuthChecked).toBe(true);
		});
	});

	describe('получение данных пользователя', () => {
		it('обрабатывает pending состояние', () => {
			const action = { type: fetchUser.pending.type };
			const state = userReducer(initialState, action);

			expect(state.status).toBe('loading');
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает fulfilled состояние', () => {
			const mockUser = { user: { name: 'Test User', email: 'test@test.com' } };
			const action = {
				type: fetchUser.fulfilled.type,
				payload: mockUser
			};

			const state = userReducer(initialState, action);

			expect(state.user).toEqual(mockUser.user);
			expect(state.status).toBe('succeeded');
			expect(state.isLoading).toBe(false);
		});

		it('обрабатывает rejected состояние', () => {
			const error = new Error('Тестовая ошибка');
			const action = {
				type: fetchUser.rejected.type,
				error: { message: error.message }
			};

			const state = userReducer(initialState, action);

			expect(state.error).toBe(error.message);
			expect(state.status).toBe('failed');
			expect(state.isLoading).toBe(false);
		});
	});

	describe('обновление данных пользователя', () => {
		it('обрабатывает pending состояние', () => {
			const action = { type: updateUserDetails.pending.type };
			const state = userReducer(initialState, action);

			expect(state.status).toBe('loading');
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает fulfilled состояние', () => {
			const mockUser = {
				user: { name: 'Updated User', email: 'updated@test.com' }
			};
			const action = {
				type: updateUserDetails.fulfilled.type,
				payload: mockUser
			};

			const state = userReducer(initialState, action);

			expect(state.status).toBe('succeeded');
			expect(state.isLoading).toBe(false);
			expect(state.user).toEqual(mockUser.user);
		});

		it('обрабатывает rejected состояние', () => {
			const error = new Error('Тестовая ошибка');
			const action = {
				type: updateUserDetails.rejected.type,
				error: { message: error.message }
			};

			const state = userReducer(initialState, action);

			expect(state.error).toBe(error.message);
			expect(state.status).toBe('failed');
			expect(state.isLoading).toBe(false);
		});
	});

	describe('получение заказов пользователя', () => {
		it('обрабатывает pending состояние', () => {
			const action = { type: getOrders.pending.type };
			const state = userReducer(initialState, action);

			expect(state.status).toBe('loading');
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает fulfilled состояние', () => {
			const mockOrders = [{ _id: '1', number: 1, status: 'done' }];
			const action = {
				type: getOrders.fulfilled.type,
				payload: mockOrders
			};

			const state = userReducer(initialState, action);

			expect(state.orders).toEqual(mockOrders);
			expect(state.status).toBe('succeeded');
			expect(state.isLoading).toBe(false);
		});

		it('обрабатывает rejected состояние', () => {
			const error = new Error('Тестовая ошибка');
			const action = {
				type: getOrders.rejected.type,
				error: { message: error.message }
			};

			const state = userReducer(initialState, action);

			expect(state.error).toBe(error.message);
			expect(state.status).toBe('failed');
			expect(state.isLoading).toBe(false);
		});
	});
});
