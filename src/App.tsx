import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import TextFileView from './components/textFile/TextFileView';
import WordCloudView from './components/wordCloud/WordCloudView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TextFileView />} />
          <Route path="word-cloud/:id" element={<WordCloudView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
