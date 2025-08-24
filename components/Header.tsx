import { SignInButton, SignIn, SignOutButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar container">
        <h2> work timer</h2>
        <div>
          <SignInButton>
            <button className="btn"> Sign In</button>
          </SignInButton>
          <SignOutButton>
            <button className="btn"> Sign Out</button>
          </SignOutButton>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
