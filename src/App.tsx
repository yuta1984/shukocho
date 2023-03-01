import { Home } from '@mui/icons-material';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      hoge
      <Routes>
        <Route path={`/`} element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
