Add-Type -AssemblyName System.Drawing

$src = "C:\Users\dell\.gemini\antigravity-ide\brain\d9b9eff5-4538-4cd5-aa20-1bea308758b3\.user_uploaded\media_1789548466146.png"
$img = [System.Drawing.Bitmap]::FromFile($src)

# Ensure output directory exists
$outDir = "c:\Users\dell\Desktop\derivionblog\public\images\blogs"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir
}

# 1. "MEET YOUR ONLY FOUR LEGAL FRIENDS"
# In media_1789548466146.png (495 x 682), the first image is roughly y: 40 to 225, x: 65 to 445
$crop1Rect = New-Object System.Drawing.Rectangle(65, 38, 380, 185)
$bmp1 = $img.Clone($crop1Rect, $img.PixelFormat)
$bmp1.Save("$outDir\four-legal-friends.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp1.Dispose()

# 2. Comic comparison onshore vs offshore
# Roughly y: 265 to 465, x: 65 to 445
$crop2Rect = New-Object System.Drawing.Rectangle(65, 265, 380, 195)
$bmp2 = $img.Clone($crop2Rect, $img.PixelFormat)
$bmp2.Save("$outDir\onshore-vs-offshore.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()

$img.Dispose()
Write-Output "Successfully cropped blog illustrations!"
