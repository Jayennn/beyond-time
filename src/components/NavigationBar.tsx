import Link from "next/link";

export function NavigationBar() {

    return (
        <nav className="h-16 fixed top-0 z-10 w-full flex items-center font-poppins text-secondary">
            <div className="container mx-auto flex items-center justify-between text-xs group">
                <div className="flex items-center">
                    <Link href="/" className="links uppercase">Beyond Time</Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Link href="/about-you" className="links uppercase">About You</Link>
                    <Link href="/see-characters" className="links uppercase">See Characters</Link>
                </div>
            </div>
        </nav>
    );
}