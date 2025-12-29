import { createContext, useContext, useState, ReactNode } from 'react';
import { Student } from '@/lib/types';

interface AuthContextType {
  student: Student | null;
  isAdmin: boolean;
  loginStudent: (email: string, rollNumber: string) => void;
  loginAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const loginStudent = (email: string, rollNumber: string) => {
    // Mock login - accept any credentials
    setStudent({
      id: 'STU-001',
      name: rollNumber.toUpperCase(),
      email,
      rollNumber,
    });
    setIsAdmin(false);
  };

  const loginAdmin = () => {
    setIsAdmin(true);
    setStudent(null);
  };

  const logout = () => {
    setStudent(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ student, isAdmin, loginStudent, loginAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
