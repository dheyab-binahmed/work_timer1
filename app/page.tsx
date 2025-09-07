import Link from "next/link";

const HomePage = () => {
  return (
    <main>
      <h1> Work tracker</h1>
      <Link href="/data"className="no-underline text-blue-600 hover:underline btn justify-center items-center">Enter New Data</Link>
    </main>
  );
};

export default HomePage;
