import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen min-w-screen-2xl mx-auto px-4 py-6 font-nunito">
        <Outlet></Outlet>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
