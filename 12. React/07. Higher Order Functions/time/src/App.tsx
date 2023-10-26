import { ReactComponentElement, useState } from 'react'
import moment from 'moment';
import './App.css'
import { VideoItem } from './models/models.ts';
import { dateTransform } from './utils/dateTransform.ts';


function DateTime(props: { date: string }) {
  return (
    <p className="date">{props.date}</p>
  );
}

function DateTimePretty(Component: ReactComponentElement<{ date: string }>) {
  return function (props) {
    const { date } = props;
    return <Component date={dateTransform(date)} />
  }
}

function Video(props: VideoItem) {

  const DateTimePrettyComponent = DateTimePretty(DateTime);

  return (
    <div className="video">
      <iframe src={props.url} allow="autoplay; encrypted-media" allowFullScreen></iframe>
      <DateTimePrettyComponent date={props.date} />
    </div>
  );
}

function VideoList(props: { list: VideoItem[] }) {
  return props.list.map(item => <Video key={item.url} url={item.url} date={item.date} />);
}

function App() {
  const [list, setList] = useState<VideoItem[]>([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ]);

  return (
    <>
      <VideoList list={list} />
    </>
  )
}

export default App
