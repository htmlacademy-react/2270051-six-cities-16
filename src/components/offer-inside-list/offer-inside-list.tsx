type OfferInsideListProps = {
  goods: string[];
}

function OfferInsideList({goods}: OfferInsideListProps) {
  return (
    <ul className="offer__inside-list">
      {goods.map((good, index) => (
        <li className="offer__inside-item" key={index}>
          {good}
        </li>
      ))}
    </ul>
  );
}

export default OfferInsideList;
