$tempfile = Join-Path $PSScriptRoot "tempfile.txt"
git log --no-merges --pretty=format:"%ae" | Out-File -FilePath $tempfile -Encoding utf8

$usernames = Get-Content -Path $tempfile | ForEach-Object { ($_ -split '@')[0] } | Sort-Object -Unique

foreach ($username in $usernames) {
    $count = (git log --no-merges --author="$username" --oneline | Measure-Object).Count
    Write-Host "Username: $username - Commits: $count"
}

Remove-Item -Path $tempfile

Pause
