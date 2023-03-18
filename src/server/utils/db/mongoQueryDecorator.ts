// // src/utils/mongoQueryDecorators.ts

// import { Query } from 'tsoa';

// export function MongoQuery() {
//   return function (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
//     Query('filters')({
//       description: 'Filtering options using MongoDB query syntax. Example: filters[name][$eq]=John',
//       required: false,
//       type: 'string',
//     })(target, propertyKey);

//     Query('sort')({
//       description: 'Sorting options using MongoDB sort syntax. Example: sort=name,-age',
//       required: false,
//       type: 'string',
//     })(target, propertyKey);

//     Query('limit')({
//       description: 'Limit the number of records returned. Example: limit=10',
//       required: false,
//       type: 'integer',
//     })(target, propertyKey);

//     Query('page')({
//       description: 'The page number to return. Example: page=2',
//       required: false,
//       type: 'integer',
//     })(target, propertyKey);
//   };
// }
