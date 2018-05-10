import { Factory, faker  } from 'ember-cli-mirage';

export default Factory.extend({
    type: 'rentals',
    title(i) {
        if (i === 0) {
            return 'Grand Old Mansion';
        } else {
            return faker.random.arrayElement([
                'Urban Living',
                'Downtown Charm'
            ]);
        }
    },
    owner() {
        return faker.fake("{{name.firstName}} {{name.lastName}}");
    },
    city(i) {
        if (i === 0) {
            return 'Seattle';
        } else {
            return faker.random.arrayElement([
                'San Francisco',
                'Portland'
            ]);
        }
    },
    category(i) {
        if (i === 0) {
            return 'Estate';
        } else {
            return faker.random.arrayElement([
                'Townhouse',
                'Apartment'
            ]);
        }
    },
    bedrooms() {
        return faker.random.number({min:1, max:15});
    },
    image(i) {
        return `https://picsum.photos/800?image=${i}`;
    }
});
