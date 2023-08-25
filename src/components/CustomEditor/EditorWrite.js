import "./index.scss";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import { useState } from "react";


export default function EditorWrite({changeValue}, ref) {
  
  const [value, setValue] = useState("");
  const plugins = [
    gfm(), {actions: [{
      title: "切换",
      position: "right",
      // cheatsheet: "xx",
      icon: '翻译', // 16x16 SVG icon
      handler: {
          type: 'action',
          click(ctx, y) {
            // to be implement:
            // the `ctx` is an instance of `BytemdEditorContext`, which has
            // several utility methods to help operate the CodeMirror editor state.

            // remember to call `focus` to avoid lost of focus
            ctx.editor.focus()
            changeValue(value);
            // console.log(ctx, y);
          },
      },
    }]}
  ]
  
  return (
    <div className="Editor">
      <Editor
        mode="tab"
        locale={zh_Hans}
        value={value}
        plugins={plugins}
        // overridePreview={(
        //   previewEl,
        //   { value }
        // ) => {
        //   const container = previewEl;
        //   if (container && !root) {
        //     setRoot(createRoot(container));
        //   }
        //   if (container && root) {
        //     // 翻译 ====>
        //     const test = value + "en";
        //     // render ====>
        //     root.render(<Editor value={test} />);
        //   }
        // }}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  )
}