import './App.css'
import News from './components/News'
import TextItem from './components/TextItem'
import Search from './components/Search'
import Widgets from './components/Widgets'
import Widget from './components/Widget'

function App() {

  const data = [
    { text: 'text #1', url: 'https://google.com' },
    { text: 'text #2', url: 'https://google.com' },
    { text: 'text #3', url: 'https://google.com' }]

  const props = {
    icon: '📰',
    data: data
  }

  return (
    <>
      <News title="Header">
        <TextItem {...props} />
      </News>
      <Search />
      <Widgets>
        <Widget />
      </Widgets>
    </>
  )
}

export default App
