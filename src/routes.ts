import { Routes } from 'nest-router';
import ExampleModule from './domains/example/example.module';

const ROUTES: Routes = [
  {
    path: '/v1/examples',
    module: ExampleModule,
  },
];

export default ROUTES;
