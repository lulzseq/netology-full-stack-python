import '../App.css';

interface ListingProps {
    item: {
        listing_id: number;
        url: string;
        MainImage: {
            url_570xN: string;
        };
        title: string;
        currency_code: string;
        price: string;
        quantity: number;
    };
}

export default function Listing({ item }: ListingProps) {
    const { url, MainImage, title, currency_code, price, quantity } = item;

    return (
        <div className="item-list">
            <div className="item">
                <div className="item-image">
                    <a href={url}>
                        <img src={MainImage.url_570xN} alt={title} />
                    </a>
                </div>
                <div className="item-details">
                    <p className="item-title">{title.length > 50 ? `${title.substring(0, 50)}...` : title}</p>
                    <p className="item-price">
                        {currency_code === 'USD' ? `$${price}` : currency_code === 'EUR' ? `€${price}` : `${price} ${currency_code}`}
                    </p>
                    <p className={`item-quantity ${quantity <= 10 ? "level-low" : quantity > 20 ? "level-high" : "level-medium"}`}>
                        {quantity} left
                    </p>
                </div>
            </div>
        </div>
    );
}