var SCRIPT_TITLE = "Lyrics Shift Right";
var SCRIPT_CATEGORY = "edit note";

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
      [SCRIPT_TITLE, "歌詞を右にずらす"],
      [SCRIPT_CATEGORY, "ノート編集"],
    ];
  }
  return [];
}

function sortNotes(arr_notes) {
  return arr_notes.sort(function(a,b) {
    if(a.getOnset() < b.getOnset()) return -1;
    if(a.getOnset() > b.getOnset()) return 1;
    return 0;
  });
}

function noteGetter(arr_like, index) {
  if(Array.isArray(arr_like)) {
    return arr_like[index];
  } else {
    // the input is a NoteGroup
    return arr_like.getNote(index);
  }
}

function LyricsShiftRight(selection) {
  var selectedNotes = sortNotes(selection.getSelectedNotes());
  selection.clearNotes();
  for (var i = selectedNotes.length - 1; i >=0; i--) {
    var note = noteGetter(selectedNotes, i);
    var allCount = note.getParent().getNumNotes();
    var nextNoteIndex = note.getIndexInParent() + 1;
    if (allCount <= nextNoteIndex) {
      continue;
    }
    var nextNote = note.getParent().getNote(nextNoteIndex);
    nextNote.setLyrics(note.getLyrics());
    selection.selectNote(nextNote);
    if(i == 0) {
      note.setLyrics("-");
    }
  }
}

function main() {
  var selection = SV.getMainEditor().getSelection();
  LyricsShiftRight(selection);
 
  SV.finish();
}
