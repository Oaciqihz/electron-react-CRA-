import "./index.scss";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import { forwardRef, useImperativeHandle, useState } from "react";
import { translate } from "../../request/api";
import { time } from "../../utils/time";

function EditorPreview(props, ref) {
  
    const { getCurrentTime } = time();
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState();
    const plugins = [gfm(), {actions: [{
        title: "导出为md文件",
        position: "right",
        // cheatsheet: "xx",
        icon: '导出', // 16x16 SVG icon
        handler: {
            type: 'action',
            click(ctx, y) {
                // to be implement:
                // the `ctx` is an instance of `BytemdEditorContext`, which has
                // several utility methods to help operate the CodeMirror editor state.
  
                // remember to call `focus` to avoid lost of focus
                // ctx.editor.focus()
                downloadMarkdown(value, `translation-${getCurrentTime()}.md`)
            },
        },
      }]}
    ];

    function downloadMarkdown(markdownContent, fileName) {
        const textBlob = new Blob([markdownContent], { type: 'text/markdown' });
        const downloadUrl = URL.createObjectURL(textBlob);
      
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
      
        downloadLink.click();
      
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
    }
    
    async function changeValue(value) {
        setLoading(true);
        // 翻译
        await translate({
            origin: value,
            translation: "",
            sourceLang: "en",
            targetLang: "zh-cn"
        })
        .then(res => {
            setValue(res.translation);
            setLoading(false);
        })
    }

    useImperativeHandle(ref, () => ({
        changeValue,
    }))
  
    return (
        <div className="Editor Editor-preview">
            <Editor
              mode="tab"
              locale={zh_Hans}
              value={value}
              plugins={plugins}
              onChange={(v) => {
                setValue(v);
              }}
            />
            {
                loading &&
                <div className="loading">
                    <div className="loading-box"></div>
                </div>
            }
        </div>
    )
}

export default forwardRef(EditorPreview)