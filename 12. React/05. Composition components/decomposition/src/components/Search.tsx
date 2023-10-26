import SearchHeader from './SearchHeader';
import Form from './Form';
import { ISearchHeader } from '../models/ISearchHeader';
import { IForm } from '../models/IForm';

export default function Search() {
    const searchHeaderLinks: ISearchHeader[] = [
        { text: 'images', url: 'https://google.com/images' },
        { text: 'news', url: 'https://google.com/news' },
        { text: 'video', url: 'https://google.com/video' },
    ];

    const formProps: IForm = {
        placeholder: 'Search',
        icon: '📰',
        btnText: 'Search',
    };

    return (
        <div className='search'>
            <SearchHeader links={searchHeaderLinks} />
            <Form {...formProps} />
        </div>
    );
}
