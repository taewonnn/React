import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import Main from './components/Main';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
