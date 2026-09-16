Add-Type -AssemblyName System.Drawing

$src = "C:\Users\dell\.gemini\antigravity-ide\brain\d9b9eff5-4538-4cd5-aa20-1bea308758b3\.user_uploaded\media_1789548466146.png"
$img = [System.Drawing.Image]::FromFile($src)
Write-Output "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
