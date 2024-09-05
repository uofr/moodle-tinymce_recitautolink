$from = "moodle-tinymce_recitautolink/src/*"
$to = "shared/recitfad3/lib/editor/tiny/plugins/recitautolink"

try {
    . ("..\sync\watcher.ps1")
}
catch {
    Write-Host "Error while loading sync.ps1 script." 
}