import Form from './components/Form'
import "animate.css"
import CardNotes from './components/CardNotes'
import Context from './context/Context'

function App() {
  return (
    <Context>
    <div className="container h-100 pt-4">
      <div className="row h-100">
        <div className="col-md-4">
          <Form/>
        </div>
        <div className="col-md-8">
          <CardNotes/>
        </div>
      </div>
    </div>
    </Context>
  );
}

export default App;
