export default function Footer({ darkMode }) {
  return (
    <footer className={`footer ${darkMode ? 'footer--dark' : 'footer--light'}`}>
      <p className='footer__text'>푸터 컴포넌트</p>
    </footer>
  );
}
