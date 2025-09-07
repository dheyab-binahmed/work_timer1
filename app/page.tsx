import Link from "next/link";

const HomePage = () => {
  return (
    <main>
      <h1> Work tracker</h1>
      <Link href="/data" className="btn ">Enter New Data</Link>
    </main>
  );
};

export default HomePage;
