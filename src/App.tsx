import { AppSidebar } from "@/components/AppSidebar";
import { SettingsDropDown } from "@/components/SettingsDropdown";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { BookSearchProvider } from "./components/book/BookSearchProvider";
import List from "./pages/book-search/List";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BookSearchProvider>
                <Toaster />
                <SidebarProvider>
                    <div className="flex w-full h-screen">
                        <AppSidebar />
                        <main className="flex-1 overflow-y-auto flex flex-col">
                            <div className="flex justify-between w-full sticky top-0 p-3">
                                <SidebarTrigger />
                                <div className="flex gap-3">
                                    <ThemeToggle />
                                    <SettingsDropDown />
                                </div>
                            </div>
                            <List />
                        </main>
                    </div>
                </SidebarProvider>
            </BookSearchProvider>
        </ThemeProvider>
    );
};

export default App;
