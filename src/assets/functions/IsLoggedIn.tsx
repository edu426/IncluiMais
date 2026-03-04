import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

export default function IsLoggedIn({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        // Retorna silenciosamente até o Clerk terminar de carregar
        return null;
    }

    if (isSignedIn) {
        return <>{children}</>;
    } else {
        console.log("User is not logged in");
        // O Navigate reencaminha automaticamente quando renderizado
        return <Navigate to="/" replace />;
    }
}