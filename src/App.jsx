
import Header from './components/layout/Header/Header'
import Sliderate from './components/layout/Silderate/Silderate;'
import Button from './components/ui/Button';
import iconFavorite from './assets/icon-favorite.svg';

export default function App() {
  

  return (
    <main>
      <Header />
      <Sliderate/>
      <Button>
        <span>
          <img src={iconFavorite} alt='icon-favorite' />
        </span>
        FAVORITED
      </Button>
    </main>
  )
}


