import React, { useState } from 'react';
import './App.css';
import { ListItem, HighlightedComponentProps } from './models.ts';

function New(props: { children: React.ReactNode }) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props: { children: React.ReactNode }) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props: { title: string; views: number }) {
  return (
    <div className="item item-article">
      <h3><a href="#">{props.title}</a></h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props: { url: string; views: number }) {
  return (
    <div className="item item-video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Video"></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

function highlightItem (Component: React.ComponentType<HighlightedComponentProps>) {
  return function (props: ListItem) {
    if (props.views >= 1000) {
      return (
        <Popular>
          <Component {...props} />
        </Popular>
      );
    } else if (props.views <= 100) {
      return (
        <New>
          <Component {...props} />
        </New>
      );
    }
    return <Component {...props} />;
  };
};

const HighlightVideo = highlightItem(Video);
const HighlightArticle = highlightItem(Article);

function List(props: { list: ListItem[] }) {
  return props.list.map((item, index) => {
    switch (item.type) {
      case 'video':
        return (
          <HighlightVideo key={index} {...item} />
        );

      case 'article':
        return (
          <HighlightArticle key={index} {...item} />
        );
      default:
        return null;
    }
  });
}

function App() {
  const [list, setList] = useState<ListItem[]>([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12,
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175,
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253,
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return (
    <List list={list} />
  );
}

export default App;
