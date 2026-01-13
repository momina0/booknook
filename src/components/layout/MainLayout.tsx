import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1767486366783-cf739f028320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBwaW5rJTIwcHVycGxlJTIwc2t5JTIwZHJlYW15fGVufDF8fHx8MTc2ODMzODI1M3ww&ixlib=rb-4.1.0&q=80&w=1080)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,240,255,0.85) 0%, rgba(255,230,250,0.9) 30%, rgba(250,235,255,0.9) 70%, rgba(255,240,255,0.85) 100%)',
        }}
      />
      
      <AppSidebar />
      <main className="flex-1 overflow-auto relative z-10">
        <div className="container py-8 px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
