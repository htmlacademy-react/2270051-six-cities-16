import MainPage from '../../pages/main-page/main-page';

type AppPageProps = {
  offerCount: number;
}

function App({offerCount}: AppPageProps): JSX.Element {
  return (
    <MainPage offersCount={offerCount} />
  );
}

export default App;
