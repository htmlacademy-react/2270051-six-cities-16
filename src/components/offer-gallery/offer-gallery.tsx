import {PHOTO_COUNT} from '../../const';

type OfferGalleryProps = {
  images: string[];
}

function OfferGallery({images}: OfferGalleryProps) {
  const displayedImages = images.slice(0, PHOTO_COUNT);

  return (
    <div className="offer__gallery">
      {displayedImages.map((image) => (
        <div className="offer__image-wrapper" key={image}>
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}

export default OfferGallery;
