import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    filterByCity(query) {
      if (query !== '') {
        return this.get('store')
          .query('rental', {city: query})
          .then(results => {
            return {
              query: query,
              results: results
            }
          });
      } else {
        return this.get('store')
          .findAll('rental')
          .then(results => {
            return {
              query: query,
              results: results
            }
          });
      }
    }
  }
});
