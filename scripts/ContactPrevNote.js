var SCRIPT_TITLE = "Contact Prev Note";
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
      [SCRIPT_TITLE, "前のノートと繋げる"],
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

function contactPrevNote(arr_like) {
  for (var i = 0; i < arr_like.length; i++) {
    var note = noteGetter(arr_like, i);
    var allCount = note.getParent().getNumNotes();
    var prevNoteIndex = note.getIndexInParent() - 1;
    if (0 > prevNoteIndex) {
      continue;
    }
    var prevNote = note.getParent().getNote(prevNoteIndex);
    var nextOnset = note.getOnset();
    var prevEnd = prevNote.getEnd();
    if (nextOnset != prevEnd && (nextOnset - prevEnd) < SV.QUARTER * 8.0) {
      var nextEnd = note.getEnd();
      note.setOnset(prevEnd)
      note.setDuration(nextEnd - prevEnd);
    }
  }
}

function main() {
  var selection = SV.getMainEditor().getSelection();
  var selectedNotes = sortNotes(selection.getSelectedNotes());
  contactPrevNote(selectedNotes);
 
  SV.finish();
}
