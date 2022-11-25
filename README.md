# synthv-scripts
Synthesizer V Studio 用スクリプトです。

このページの Code ボタンから Download ZIP を選んでダウンロードしてください。スクリプトは zip の中の scripts フォルダに入っています。

## 次のノートと繋げる（Contact Next Note）
- ファイル： ContactNextNote.js
- カテゴリ： ノート編集

選択したノートの長さを変更し、次のノートとの隙間を埋めます。重なっている場合は重なりを除去します。  
複数選択して一括処理可能です。

![ContactNextNote](https://raw.githubusercontent.com/hetima/synthv-scripts/main/images/ContactNextNote.jpg)


## 前のノートと繋げる（Contact Prev Note）
- ファイル： ContactPrevNote.js
- カテゴリ： ノート編集

「次のノートと繋げる」と同じような機能ですが、こちらはノート開始位置も変わります。選択したノートの長さと位置を変更し、前のノートとの隙間や重なりを除去します。


## 歌詞を右(左)にずらす（Lyrics Shift Left|Right）
- ファイル： LyricsShiftLeft.js / LyricsShiftRight.js
- カテゴリ： ノート編集

選択したノートの歌詞をひとつ右(もしくは左)にずらします。選択範囲もそれに合わせて変化します。ずれる先の歌詞は1個消え、後ろの歌詞は「-」になります。「a[iue]o」と選択して右にずらすと「a-[iue]」となります。



## 選択範囲から新規トラック（New Track With Selection）
- ファイル： NewTrackWithSelection.js
- カテゴリ： トラック

選択されているノートとグループを要素に持つ新規トラックを作成します。ノートをコピーするか移動するか選択できます。オートメーションはトラック全体すべてコピーされます。

