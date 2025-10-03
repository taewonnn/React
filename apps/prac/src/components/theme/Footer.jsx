import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

export default function Footer() {
  // 2. context 사용
  const { darkMode } = useContext(DarkModeContext);

  return (
    <footer className={`footer ${darkMode ? 'footer--dark' : 'footer--light'}`}>
      <p className='footer__text'>푸터 컴포넌트</p>
    </footer>
  );
}
