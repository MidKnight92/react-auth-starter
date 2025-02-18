import { logInRoute } from './logInRoute';
import { signUpRoute } from './signUpRoute';
import { testEmailRoute } from './testEmailRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';

const testRoutes = [
    testRoute,
    testEmailRoute
]

const routes = [
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute
];

if (process.env.NODE_ENV === 'development') {
    routes.push(...testRoutes);
}


export default routes;