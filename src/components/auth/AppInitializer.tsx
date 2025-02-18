
"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { UserData } from "@/lib/types/auth";

interface AppInitializerProps {
  children: React.ReactNode;
  userData: UserData;
}

const AppInitializer: React.FC<AppInitializerProps> = ({
  children,
  userData,
}) => {
  const setUser = useAuthStore((state) => state.login);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
      setAccessToken(userData.access_token);
    }
  }, [userData, setUser]);

  return <>{children}</>;
};

export default AppInitializer;
