import { useState } from "react";
import "./App.css";
import RichTextEditor from "./pages/RichFeatureTextEditor";
import { LowFeatureTextEditor } from "./pages/LowFeatureTextEditor";

const App = () => {
// const [content, setContent] = useState(`<ul class="ul"><li value="1" class="listItem"><i><b><strong class="textBold textItalic" style="white-space: pre-wrap;">Text </strong></b></i><i><b><strong class="textBold textItalic" style="color: rgb(22, 165, 165); white-space: pre-wrap;">context1</strong></b></i></li><li value="2" class="listItem"><i><b><strong class="textBold textItalic" style="white-space: pre-wrap;">Text context2</strong></b></i></li><li value="3" class="listItem"><i><b><strong class="textBold textItalic" style="white-space: pre-wrap;">Text context3</strong></b></i></li></ul>`)
const [content, setContent] = useState("")
const [lowContent, setLowContent] = useState("")
  return (
    <>
      <RichTextEditor content={content} setContent={setContent} />
      <div className="">
        <span style={{fontWeight: "bold", color: "grey", marginTop: "2rem"}}>Editor exported content in HTML: </span>
        {/* <div style={{padding: "20px"}}>{content}</div> */}
        <div  dangerouslySetInnerHTML={{__html: content}}></div>
      </div>
      {/* <LowFeatureTextEditor content={lowContent} setContent={setLowContent} />
      <div dangerouslySetInnerHTML={{__html: lowContent}}></div> */}
    </>
  );
};

export default App;
