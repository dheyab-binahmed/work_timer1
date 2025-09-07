import {
  SignInButton,
  UserButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";

const Header = async () => {

  return (
    <nav className="navbar">
      <div className="navbar container">
        <h2> work timer</h2>
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
