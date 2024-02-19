import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const localStorageToken = localStorage.getItem("token");

	// decode the jwt & see if its expired
	const decodedToken = localStorageToken
		? JSON.parse(atob(localStorageToken.split(".")[1]))
		: null;
	const isExpired = decodedToken ? decodedToken.exp < Date.now() / 1000 : true;

	// if token is expired, remove it
	if (isExpired) {
		localStorage.removeItem("token");
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;