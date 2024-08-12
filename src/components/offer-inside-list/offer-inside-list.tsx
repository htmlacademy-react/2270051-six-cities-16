type OfferInsideListProps = {
  goods: string[];
}

function OfferInsideList({goods}: OfferInsideListProps) {
  return (
    <ul className="offer__inside-list">
      {goods.map((good) => (
        <li className="offer__inside-item" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
}

export default OfferInsideList;
