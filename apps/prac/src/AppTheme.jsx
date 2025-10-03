import './AppTheme.css';
import HeaderTheme from './components/theme/Header.jsx';
import MainTheme from './components/theme/Main.jsx';
import FooterTheme from './components/theme/Footer.jsx';
import { DarkModeProvider } from './context/DarkModeProvider.jsx';

function AppTheme() {
  return (
    <DarkModeProvider initialDarkMode={false}>
      <HeaderTheme />
      <MainTheme />
      <FooterTheme />
    </DarkModeProvider>
  );
}

export default AppTheme;
