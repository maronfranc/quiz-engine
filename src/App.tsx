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
          <div> A </div>
          <div> B </div>
      </aside>

      <footer>
        <button>Previous</button>
        <button>Next</button>
      </footer>
    </div>
  );
}

export default App
