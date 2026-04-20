describe('Тестируем модальное окно', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('При клике на ингредиент открывается и закрывается модалка', () => {
    const ingredients = cy.get("[data-cy='ingredient']");
    ingredients.first().click();
    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='modal-close-btn']").click();
    cy.get("[data-cy='modal']").should('not.exist');
  });

  it('Закрываем модальное окно при клике на оверлей', () => {
    const ingredients = cy.get("[data-cy='ingredient']");
    ingredients.first().click();
    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='modal-overlay']").click({ force: true });
    cy.get("[data-cy='modal']").should('not.exist');
  });

  it('Открываем модальное окно при успешном выполнении заказа', () => {
    //Добавляем ингредиенты в заказ
    cy.get("[data-cy='add-inredient-btn'] button").first().click();
    cy.get("[data-cy='add-inredient-btn'] button").eq(1).click();

    // Проверяем что элементы добавились в заказ
    cy.get("[data-cy='bun-ingredient']").contains('Ингредиент-1');
    cy.get("[data-cy='others-ingredients']").contains('Ингредиент-2');

    //Оформляем заказ
    cy.get("[data-cy='create-order-btn'] button").click();

    //Ждем ответа
    cy.wait('@postOrder');

    //Проверяем что модальное окно открыто
    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='order-number']").contains('1');

    //Проверяем, что конструктор пуст
    cy.get("[data-cy='bun-ingredient']").should('not.exist');
    cy.get("[data-cy='others-ingredients']").should(
      'not.contain',
      'Ингредиент-2'
    );
  });
});
