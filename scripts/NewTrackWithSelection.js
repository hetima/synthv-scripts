var SCRIPT_TITLE = "New Track With Selection";
var SCRIPT_CATEGORY = "track";

function getClientInfo() {
  return {
    "name": SV.T(SCRIPT_TITLE),
    category: SV.T(SCRIPT_CATEGORY),
    "author": "hetima",
    "versionNumber": 1,
    "minEditorVersion": 66048
  }
}

function getTranslations(langCode) {
  if(langCode == "ja-jp") {
    return [
      [SCRIPT_TITLE, "選択範囲から新規トラック"],
      [SCRIPT_CATEGORY, "トラック"],
      ["Processing Method", "選択範囲を"],
      ["Copy", "コピー"],
      ["Move", "移動"],
      ["Error", "エラー"],
      ["There is no selection", "選択範囲がありません"],
    ];
  }
  return [];
}

function noteGetter(arr_like, index) {
  if(Array.isArray(arr_like)) {
    return arr_like[index];
  } else {
    // the input is a NoteGroup
    return arr_like.getNote(index);
  }
}


//トラックを複製
function duplicateTrack(track) {
  var project = SV.getProject();
  var trackNum = project.addTrack(track.clone());
  //複製された方が上になる
  return project.getTrack(trackNum);
}

//選択されているノートとグループのonsetを取得
function selectedOnsets() {
  var result = new Array(0);
  //ピアノロールの選択
  var selection = SV.getMainEditor().getSelection();
  var selectedNotes = selection.getSelectedNotes();
  for (var i = 0; i < selectedNotes.length; i++) {
    var note = noteGetter(selectedNotes, i);
    result.push(note.getOnset());
  }
  var grp = selection.getSelectedGroups();
  for (var i = 0; i < grp.length; i++) {
    result.push(grp[i].getOnset());
  }
  //トラックビューの選択
  //アクティブではないトラックのグループを選択している場合の対処が面倒なので未対応
  // if (result.length == 0){
  //   //var track = SV.getMainEditor().getCurrentTrack();
  //   var grp = SV.getArrangement().getSelection().getSelectedGroups();
  //   for (var i = 0; i < grp.length; i++) {
  //     if (grp[i].getParent() == track) {
  //       result.push(grp[i].getOnset());
  //     }
  //   }
  // }
  return result;
}

//選択されていなかったノートとグループを削除
function cleanupTrack(track, onsets, toKeep) {
  if (track.getNumGroups() <= 0 || onsets.length <= 0) {
    return;
  }
  var notes = track.getGroupReference(0).getTarget();
  for (var i = notes.getNumNotes() -1; i >= 0; i--) {
    var note = notes.getNote(i);
    var onset = note.getOnset();
    //onsets.includes(onset)だとエラー出る。何故
    if ((toKeep && onsets.indexOf(onset) < 0) || (!toKeep && onsets.indexOf(onset) >= 0)) {
      notes.removeNote(i);
    }
  }

  for (var i = track.getNumGroups() - 1; i >= 1; i--) {
    var grp = track.getGroupReference(i);
    var onset = grp.getOnset();
    if ((toKeep && onsets.indexOf(onset) < 0) || (!toKeep && onsets.indexOf(onset) >= 0)) {
       track.removeGroupReference(i);
    }
  }
}

function main() {
  var currentTrack = SV.getMainEditor().getCurrentTrack();
  var onsets = selectedOnsets();
  if (onsets.length == 0){
    SV.showMessageBox("Error", SV.T("There is no selection"));
    SV.finish();
    return;
  }
  var myForm = {
    "title": SV.T("New Track With Selection"),
    "buttons": "OkCancel",
    "widgets": [
      {
        "name": "copyormove", "type": "ComboBox",
        "label": SV.T("Processing Method"),
        "choices": [SV.T("Copy"), SV.T("Move")],
        "default": 0
      },
    ]
  };
  var result = SV.showCustomDialog(myForm);

  if (result.status == 1) {
    var removeSelection = false;
    if (result.answers.copyormove == 1){
      removeSelection = true;
    }

    var newTrack = duplicateTrack(currentTrack);
    newTrack.setName(newTrack.getName() + " (copy)");
    cleanupTrack(newTrack, onsets, true);
    if (removeSelection){
      cleanupTrack(currentTrack, onsets, false);
    }
  }
  
  SV.finish();
}
