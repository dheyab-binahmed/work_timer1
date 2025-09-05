// components/Header.tsx
import Link from "next/link";
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { checkUser } from "@/lib/CheckUser";

const Header = async () => {
  await checkUser(); // ensures app user exists

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>work timer</h2>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/data">Data</Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Header;
