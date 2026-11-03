Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630

$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# 1. Clean background (#FAFAFB)
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(250, 250, 251))
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# 2. Modern top bar: Maroon primary (#650510) + Orange accent line (#F58634)
$maroonColor = [System.Drawing.Color]::FromArgb(101, 5, 16)
$maroonBrush = New-Object System.Drawing.SolidBrush $maroonColor
$g.FillRectangle($maroonBrush, 0, 0, $width, 8)

$orangeColor = [System.Drawing.Color]::FromArgb(245, 134, 52)
$orangeBrush = New-Object System.Drawing.SolidBrush $orangeColor
$g.FillRectangle($orangeBrush, 0, 8, $width, 4)

# 3. Logo (rendered cleanly centered)
$logoPath = (Resolve-Path 'public/united-rubber-cork-logo.png').Path
$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoWidth = 500
$logoHeight = [int]($logoWidth * ($logo.Height / $logo.Width))
$logoX = [int](($width - $logoWidth) / 2)
$logoY = 100
$g.DrawImage($logo, $logoX, $logoY, $logoWidth, $logoHeight)

# 4. Badge / Tagline Pill
$badgeY = 375
$badgeWidth = 460
$badgeHeight = 44
$badgeX = [int](($width - $badgeWidth) / 2)
$badgeBgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(244, 235, 236))

# Rounded pill for badge
$radius = 12
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc($badgeX, $badgeY, $radius, $radius, 180, 90)
$path.AddArc(($badgeX + $badgeWidth - $radius), $badgeY, $radius, $radius, 270, 90)
$path.AddArc(($badgeX + $badgeWidth - $radius), ($badgeY + $badgeHeight - $radius), $radius, $radius, 0, 90)
$path.AddArc($badgeX, ($badgeY + $badgeHeight - $radius), $radius, $radius, 90, 90)
$path.CloseFigure()
$g.FillPath($badgeBgBrush, $path)

$badgePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(220, 180, 185)), 1
$g.DrawPath($badgePen, $path)

# Tagline text inside pill
$fontTagline = [System.Drawing.Font]::new('Segoe UI', [float]12, [System.Drawing.FontStyle]::Bold)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$badgeRect = New-Object System.Drawing.RectangleF $badgeX, $badgeY, $badgeWidth, $badgeHeight
$g.DrawString('ENGINEERED CORK SOLUTIONS FOR INDUSTRY', $fontTagline, $maroonBrush, $badgeRect, $sf)

# 5. Core Capabilities / Subtitle
$fontSub = [System.Drawing.Font]::new('Segoe UI', [float]15, [System.Drawing.FontStyle]::Regular)
$mutedColor = [System.Drawing.Color]::FromArgb(75, 80, 90)
$mutedBrush = New-Object System.Drawing.SolidBrush $mutedColor
$rectSub = New-Object System.Drawing.RectangleF 80, 440, 1040, 50
$g.DrawString('Natural Cork Sheets & Rolls  •  Rubberised Cork Gaskets  •  Precision Components', $fontSub, $mutedBrush, $rectSub, $sf)

# 6. Bottom Divider & Manufacturing Trust Bar
$borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(229, 231, 235)), 1
$g.DrawLine($borderPen, 100, 520, 1100, 520)

$fontFooter = [System.Drawing.Font]::new('Segoe UI', [float]11, [System.Drawing.FontStyle]::Bold)
$footerColor = [System.Drawing.Color]::FromArgb(130, 135, 145)
$footerBrush = New-Object System.Drawing.SolidBrush $footerColor
$rectFooter = New-Object System.Drawing.RectangleF 100, 545, 1000, 30
$g.DrawString('Direct Manufacturing Plant: GIDC Vapi, Gujarat  |  Conforms to IS: 4253 & ASTM Standards', $fontFooter, $footerBrush, $rectFooter, $sf)

# 7. Subtle outer border
$outerPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(225, 227, 230)), 2
$g.DrawRectangle($outerPen, 1, 1, ($width - 2), ($height - 2))

# Save to both public/og-image.png and src/app/opengraph-image.png
$publicPath = Join-Path (Resolve-Path 'public').Path 'og-image.png'
$appPath = Join-Path (Resolve-Path 'src/app').Path 'opengraph-image.png'

$bmp.Save($publicPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($appPath, [System.Drawing.Imaging.ImageFormat]::Png)

$logo.Dispose()
$g.Dispose()
$bmp.Dispose()

Write-Host "OpenGraph images generated successfully at $publicPath and $appPath"
