var SCRIPT_TITLE = "Lyrics Shift Left";
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
      [SCRIPT_TITLE, "歌詞を左にずらす"],
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

function LyricsShiftLeft(selection) {
  var selectedNotes = sortNotes(selection.getSelectedNotes());
  selection.clearNotes();
  var len = selectedNotes.length;
  for (var i = 0; i < len; i++) {
    var note = noteGetter(selectedNotes, i);
    var prevNoteIndex = note.getIndexInParent() - 1;
    if (0 > prevNoteIndex) {
      continue;
    }
    var prevNote = note.getParent().getNote(prevNoteIndex);
    prevNote.setLyrics(note.getLyrics());
    selection.selectNote(prevNote);
    if (i+1 == len) {
      note.setLyrics("-");
    }
  }
}

function main() {
  var selection = SV.getMainEditor().getSelection();
  LyricsShiftLeft(selection);
 
  SV.finish();
}
