import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign from './components/pages/sign_InUp';
import PostsPage from './components/pages/postsPage';
import SettingsPage from './components/pages/settingsPage';
import NewPostPage from './components/pages/newPostPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sign/>}></Route>
          <Route path="post" element={<PostsPage/>} ></Route>
          <Route path="settings" element={<SettingsPage/>} ></Route>
          <Route path="newpost" element={<NewPostPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
// nessa barrett feat. jxdn la di die | ne bruklin | na tviche
//.toLocaleDateString('en-GB')
export default App;
