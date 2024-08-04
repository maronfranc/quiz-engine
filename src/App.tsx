import ProgressBar from './components/ProgressBar';

function App() {
  return (
    <div className="grid">
      <header>
        <ProgressBar
          label="Answer progress"
          value={85} total={100}
        />
      </header>

      <main>
        main
      </main>

      <aside>
          <button className="primary"> 1 </button>
          <button className="secondary"> 2 </button>
          <button className="success"> 3 </button>
          <button disabled> 4 </button>
      </aside>

      <footer>
        <button>Previous</button>
        <button>Next</button>
      </footer>
    </div>
  );
}

export default App;
