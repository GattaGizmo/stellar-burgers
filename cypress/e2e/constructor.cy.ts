describe('Тестирование конструктора бургера', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
			'getIngredients'
		);
		cy.visit('/');
		cy.wait('@getIngredients', { timeout: 30000 });
	});

	it('Добавление булки в конструктор', () => {
		cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();
		cy.get('[data-cy="constructor-bun-1"], [data-cy="constructor-bun-2"]')
			.should('exist')
			.and('contain', 'Булка 1');
	});

	it('Открытие и закрытие модального окна с информацией об ингредиенте', () => {
		cy.contains('Детали ингредиента').should('not.exist');
		cy.contains('Начинка 1').click();

		cy.get('#modals')
			.should('exist')
			.and('contain', 'Детали ингредиента')
			.and('contain', 'Начинка 1');

		cy.get('#modals').find('button').click();
		cy.contains('Детали ингредиента').should('not.exist');
	});
});
