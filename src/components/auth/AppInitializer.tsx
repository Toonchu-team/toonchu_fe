"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { User } from "@/lib/types/auth";

interface AppInitializerProps {
  children: React.ReactNode;
  user: User;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children, user }) => {
  const setUser = useAuthStore((state) => state.login);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return <>{children}</>;
};

export default AppInitializer;
