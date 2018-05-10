export default function() {
  this.namespace = '/api';

  this.get('/rentals', function(schema, request) {
    if (request.queryParams.city !== undefined) {
      return schema.rentals.all().filter(function(child) {
        return child.attrs.city.toLowerCase().indexOf(request.queryParams.city.toLowerCase()) !== -1;
      });
    } else {
      return schema.rentals.all();
    }
  });

  // Find and return the provided rental from our rental list above
  this.get('/rentals/:id');
}
