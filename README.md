# express-openapi-template

### by [@tyzoo](https://github.io/tyzoo)

### About

A simple express API written in typescript with example OpenAPI/Swagger annotation which is used to automatically generate beautiful and functional docs for your API.

- Automated Express/OpenAPI Documentation with `tsoa`
- Database: mongodb/mongoose via typegoose
- Authentication: Sign in With Ethereum with secure sessions via Iron Session
- Rate limit with Redis

### Demo

[https://express-openapi-ts-app.herokuapp.com/](https://express-openapi-ts-app.herokuapp.com/)

### Getting Started

- Use this template to create a new repositiory
- Create a `./.env` file with the required variables
- `npm run dev` or `yarn dev` to start the app in development mode
- View the docs at [http://localhost:4270/](http://localhost:4270/)
- Test your API at [http://localhost:4270/v1/](http://localhost:4270/v1/)

### Querying (Find All) Routes

- **Pagination**: Use limit and page query parameters to paginate through results.

  - `/crud?limit=10&page=1`

- **Sorting**: Use the sort query parameter to sort results.

  - For ascending sort, just use the field name.
    - `/crud?sort=<field name>`
  - For descending sort, add a - sign before the field name.
    - `/crud?sort=-createdAt`

- **Filtering**: Use the filters query parameter to filter results. The filters parameter expects an object that includes the filtering rules.
  - Query all items where the name field matches "Item"
    - `/crud?filters[name][$eq]=Item`
  - Query all items where the rng field is greater than or equal to 0.95
    - `/crud?filters[rng][$gte]=0.95`
  - Multiple filters
    - `/crud?filters[name][$eq]=Item&filters[rng][$gte]=0.95`
  - Using Logical Query Operators
    - `/crud?filters[$or]=[{"rng.$gte":0.90},{"name.$lte":0.10}]`
  - Case insensitive search
    - `/crud?filters[$and]=[{"name":{"$regex":"0x123456","$options":"i"}}]`
  - Query an array inside a document
    - `/api-keys?filters[$and]=[{"scopes":{"$in":["read"]}}]`

Note that not all MongoDB operators are allowed. You can refer to the documentation for the list of allowed operators.

### Links

- [helmetjs](https://helmetjs.github.io/)
- [typegoose](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide)
- [tsoa](https://tsoa-community.github.io/docs/introduction.html)
