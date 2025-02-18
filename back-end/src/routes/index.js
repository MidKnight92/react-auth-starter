import { logInRoute } from './logInRoute';
import { signUpRoute } from './signUpRoute';
import { testEmailRoute } from './testEmailRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';


const testRoutes = [
    testRoute,
    testEmailRoute
]

const routes = [
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    verifyEmailRoute
];

if (process.env.NODE_ENV === 'development') {
    routes.push(...testRoutes);
}


export default routes;