import MainPage from '../../pages/main-page/main-page';

type AppPageProps = {
  offersCount: number;
  cardsCount: number;
}

function App({offersCount, cardsCount }: AppPageProps): JSX.Element {
  return (
    <MainPage offersCount={offersCount} cardsCount={cardsCount} />
  );
}

export default App;
