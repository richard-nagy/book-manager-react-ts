import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import List from "./pages/book-search/List";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Toaster />
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1 overflow-y-auto p-3">
                        <div className="flex justify-between w-full mb-3">
                            <SidebarTrigger />
                            <ModeToggle />
                        </div>
                        <List />
                    </main>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default App;
