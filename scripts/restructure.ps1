<#
PowerShell restructure helper for Resume_Analyzer

Usage:
  # Dry run / preview (default)
  pwsh ./scripts/restructure.ps1 -DryRun

  # Apply changes (make a git commit or stash first)
  pwsh ./scripts/restructure.ps1 -Apply

The script prints planned moves and only moves files when `-Apply` is provided.
#>

[CmdletBinding()]
param(
    [switch]$DryRun = $true,
    [switch]$Apply = $false
)

Set-StrictMode -Version Latest

$root = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
Write-Host "Repo root: $root"

# Define moves as hashtable: source relative -> destination relative
$moves = @{
    "app.css" = "app/app.css"
    "root.tsx" = "app/root.tsx"
    "routes.ts" = "app/routes.ts"
    "types.tsx" = "app/types.tsx"
    "utils.ts" = "app/utils.ts"
    "components/Accordion.tsx" = "app/components/Accordion.tsx"
    "components/ATS.tsx" = "app/components/ATS.tsx"
    "components/Details.tsx" = "app/components/Details.tsx"
    "components/FileUploader.tsx" = "app/components/FileUploader.tsx"
    "components/Navbar.tsx" = "app/components/Navbar.tsx"
    "components/ResumeCard.tsx" = "app/components/ResumeCard.tsx"
    "components/ScoreBadge.tsx" = "app/components/ScoreBadge.tsx"
    "components/ScoreCircle.tsx" = "app/components/ScoreCircle.tsx"
    "components/ScoreGauge.tsx" = "app/components/ScoreGauge.tsx"
    "components/Summary.tsx" = "app/components/Summary.tsx"
    "lib/pdftoimage.ts" = "lib/pdftoimage.ts"
    "lib/puter.ts" = "lib/puter.ts"
    "lib/utils.ts" = "lib/utils.ts"
    "routes/auth.tsx" = "app/routes/auth.tsx"
    "routes/home.tsx" = "app/routes/home.tsx"
    "routes/resume.tsx" = "app/routes/resume.tsx"
    "routes/upload.tsx" = "app/routes/upload.tsx"
    "routes/wipe.tsx" = "app/routes/wipe.tsx"
    "welcome/logo-dark.svg" = "app/welcome/logo-dark.svg"
    "welcome/logo-light.svg" = "app/welcome/logo-light.svg"
    "welcome/welcome.tsx" = "app/welcome/welcome.tsx"
}

function FullPath($rel) { Join-Path $root $rel }

$plan = @()
foreach ($src in $moves.Keys) {
    $dst = $moves[$src]
    $fullSrc = FullPath $src
    $fullDst = FullPath $dst
    $plan += [PSCustomObject]@{
        Source = $src
        Destination = $dst
        SourceExists = Test-Path $fullSrc
        DestinationExists = Test-Path $fullDst
    }
}

Write-Host "Planned moves:`n"
$plan | Format-Table -AutoSize

if (-not $Apply) {
    Write-Host "`nDry run mode: no files will be moved. To apply changes run with -Apply." -ForegroundColor Yellow
    exit 0
}

Write-Host "Applying moves..." -ForegroundColor Green

# Create destination directories as needed and perform moves
foreach ($item in $plan) {
    if (-not $item.SourceExists) {
        Write-Warning "Source missing: $($item.Source) — skipping"
        continue
    }
    $fullSrc = FullPath $item.Source
    $fullDst = FullPath $item.Destination
    $dstDir = Split-Path $fullDst -Parent
    if (-not (Test-Path $dstDir)) {
        Write-Host "Creating directory: $dstDir"
        New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
    }
    Write-Host "Moving: $fullSrc -> $fullDst"
    Move-Item -Path $fullSrc -Destination $fullDst -Force
}

Write-Host "Done. Please run a quick search for broken imports and run `npm run build` or `npm run dev` to verify." -ForegroundColor Cyan
