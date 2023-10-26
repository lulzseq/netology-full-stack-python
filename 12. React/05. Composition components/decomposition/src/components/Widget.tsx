import TextItem from './TextItem'

export default function Widget() {

    const props = {
        icon: '📰'
    }

    const weatherData = [
        { text: 'current city 1', url: 'https://google.com' },
        { text: 'current city 2', url: 'https://google.com' },
    ]

    const weatherProps = {
        weatherClass: 'weather__city',
        data: weatherData
    }

    const tvProgramData = [
        {time: '00:00', text: 'name #1', url: 'https://google.com', channel: 'channel #1'},
        {time: '00:00', text: 'name #2', url: 'https://google.com', channel: 'channel #2'},
        {time: '00:00', text: 'name #3', url: 'https://google.com', channel: 'channel #3'},
    ]

    const tvProgramProps = {
        data: tvProgramData
    }

    return (
        <>
            <div className='widgets__item'>
                <h3>Weather</h3>
                <TextItem {...props} {...weatherProps} value="+20'C" />
            </div>
            <div className='widgets__item'>
                <h3>TvProgram</h3>
                <TextItem {...props} {...tvProgramProps}/>
            </div>
        </>
    )
}
