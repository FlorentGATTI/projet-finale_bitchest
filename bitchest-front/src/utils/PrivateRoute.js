import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ path, element, isLoggedIn }) {
    return isLoggedIn 
        ? <Route path={path} element={element} /> 
        : <Navigate to="/" replace />;
}

export default PrivateRoute;
