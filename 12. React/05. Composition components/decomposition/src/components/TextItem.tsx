import { ITextItem } from "../models/ITextItem";

const TextItem: React.FC<ITextItem> = ({
    icon = '📰',
    data,
    value,
    weatherClass
}) => {
    return (
        <>
            {data.map(({ text, url, channel, time }, index) => (
                <div key={index} className={(weatherClass ? weatherClass : 'news__item')}>
                    <div>{icon} &nbsp;</div>
                    <a href={url}>
                        {time} {text} &nbsp; {channel}
                        <div>{value}</div>
                    </a>
                </div>
            ))}
        </>
    );
};

TextItem.defaultProps = {
    icon: '📰'
};

export default TextItem;