import {
  SignInButton,
  UserButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = async () => {

  return (
    <nav className="navbar">
      <div className="navbar container">
        <Link href="/"className="no-underline text-blue-600 hover:underline"><h2> work timer</h2></Link>
        <div>
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
