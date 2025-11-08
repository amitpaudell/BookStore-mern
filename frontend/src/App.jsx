import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>Navbar</nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
