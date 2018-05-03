import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

module('Integration | Component | list-filter', function(hooks) {
  setupRenderingTest(hooks);

  test('should intially load all listings', async function(assert) {
    // we want our actions to return promises,
    // since they are potentially fetching data asynchronously
    this.set('filterByCity', () => resolve({ results: ITEMS }));

    // with an integration test,
    // you can set up and use your component in the same way your application
    // will use it
    await render(hbs`
      {{#list-filter
        filter=(action filterByCity) as |results|
      }}

          <div class="results">
            {{#each results as |item|}}
            <span class="city">{{item.city}}</span>
            {{/each}}
          </div>

      {{/list-filter}}
    `);

    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, 3);
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
    });
  });

  test('should update with matching listings', async function(assert) {
    this.set('filterByCity', value => {
      if (value === '') {
        return resolve({
          query: value,
          results: ITEMS
        });
      } else {
        return resolve({
          query: value,
          results: FILTERED_ITEMS
        });
      }
    });

    await render(hbs`
      {{#list-filter
        filter=(action filterByCity) as |results|
      }}

          <div class="results">
            {{#each results as |item|}}
              <span class="city">{{item.city}}</span>
            {{/each}}
          </div>

      {{/list-filter}}
    `);

    const inputElement = this.element.querySelector('.list-filter input');

    await fillIn(inputElement, 's');

    await triggerKeyEvent(inputElement, 'keyup', 83);

    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, 1, 'One results returned');
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
    });
  });
});
