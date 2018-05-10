import Service from '@ember/service';
import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { setupApplicationTest } from 'ember-qunit';

let StubMapsService = Service.extend({
  getMapElement() {
    return document.createElement('div');
  }
});

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:maps', StubMapsService);
  });

  test('should show rentals as the home page', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });

  test('should link to information about the company', async function(assert) {
    await visit('/');

    await click('.menu-about');

    assert.equal(currentURL(), '/about', 'should navigate to about page');
  });

  test('should link to contact information', async function(assert) {
    await visit('/');

    await click('.menu-contact');

    assert.equal(currentURL(), '/contact', 'should navigate to contact page');
  });

  test('should list available rentals', async function(assert) {
    server.createList('rentals', 3);

    await visit('/');

    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should show 3 listings');
  });

  test('should filter the list of rentals by city', async function(assert) {
    server.createList('rentals', 3);

    await visit('/');

    await fillIn('.list-filter input', 'seattle');

    await triggerKeyEvent('.list-filter input', 'keyup', 69);

    assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'should display one listing');

    assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain one listing with location of Seattle');
  });

  test('should show details for a selected rental', async function(assert) {
    server.createList('rentals', 3);

    await visit('/');

    await click(this.element.querySelector('.rental-link'));

    assert.equal(currentURL(), '/rentals/1', 'should navigate to show route');

    assert.ok(this.element.querySelector('.show-listing h2').textContent.includes('Grand Old Mansion'), 'should list rental title');

    assert.ok(this.element.querySelector('.show-listing .description'), 'should list a description of the property');
  });
});
