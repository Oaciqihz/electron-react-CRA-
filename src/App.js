import { useRef } from 'react';
import './App.css';
import { EditorPreview, EditorWrite } from './components/CustomEditor';

function App() {

  const editorRef = useRef(null);

  function changeValue(value) {
    editorRef.current.changeValue(value)
  }

  return (
    <div className="App">
      <div 
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <EditorWrite changeValue={changeValue} />
        <EditorPreview ref={editorRef}/>
      </div>
    </div>
  );
}

export default App;
