import ingredientsReducer, {
	fetchIngredients,
	IngredientsState,
	initialState
} from './ingredientsSlice';

jest.mock('@api', () => ({
	getIngredientsApi: jest.fn()
}));

describe('редьюсер ингредиентов', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('обработка состояний fetchIngredients', () => {
		it('обрабатывает fetchIngredients.pending', () => {
			const action = { type: fetchIngredients.pending.type };
			const state = ingredientsReducer(initialState, action);

			expect(state.status).toBe('loading');
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает fetchIngredients.fulfilled', () => {
			const mockIngredients = [
				{
					_id: '1',
					name: 'Булка 1',
					type: 'bun',
					proteins: 80,
					fat: 24,
					carbohydrates: 53,
					calories: 420,
					price: 1255,
					image: 'https://code.s3.yandex.net/react/code/bun-02.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
					__v: 0
				},
				{
					_id: '2',
					name: 'Ингредиент 1',
					type: 'main',
					proteins: 80,
					fat: 24,
					carbohydrates: 53,
					calories: 420,
					price: 1255,
					image: 'https://code.s3.yandex.net/react/code/meat-01.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
					__v: 0
				}
			];

			const action = {
				type: fetchIngredients.fulfilled.type,
				payload: mockIngredients
			};

			const state = ingredientsReducer(initialState, action);

			expect(state.status).toBe('succeeded');
			expect(state.isLoading).toBe(false);
			expect(state.ingredients).toEqual(mockIngredients);
		});

		it('обрабатывает fetchIngredients.rejected', () => {
			const error = new Error('Тестовая ошибка');

			const action = {
				type: fetchIngredients.rejected.type,
				error: { message: error.message }
			};

			const state = ingredientsReducer(initialState, action);

			expect(state.status).toBe('failed');
			expect(state.isLoading).toBe(false);
			expect(state.error).toBe(error.message);
		});
	});
});
