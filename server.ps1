$Port = 5500
$Root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
    $listener.Start()
    Write-Output "HTTP server started at http://localhost:$Port/"
} catch {
    Write-Error "Failed to start listener on port ${Port}: $_"
    exit 1
}

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".glb"   = "model/gltf-binary"
    ".gltf"  = "model/gltf+json"
    ".bin"   = "application/octet-stream"
    ".pdf"   = "application/pdf"
    ".xlsx"  = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ".xls"   = "application/vnd.ms-excel"
    ".docx"  = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ".doc"   = "application/msword"
    ".mp4"   = "video/mp4"
    ".webm"  = "video/webm"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
    ".zip"   = "application/zip"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "*")
        $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
        $response.Headers.Add("Pragma", "no-cache")
        $response.Headers.Add("Expires", "0")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $rawPath = $request.Url.AbsolutePath
        $decodedPath = [System.Uri]::UnescapeDataString($rawPath).TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($decodedPath)) {
            $decodedPath = "index.html"
        }

        $relPath = $decodedPath -replace '/', [System.IO.Path]::DirectorySeparatorChar
        $filePath = [System.IO.Path]::Combine($Root, $relPath)

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $contentType

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFoundHtml = "<html><body><h1>404 Not Found</h1><p>File not found: $([System.Web.HttpUtility]::HtmlEncode($decodedPath))</p></body></html>"
            $msg = [System.Text.Encoding]::UTF8.GetBytes($notFoundHtml)
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # Keep listening on errors
    }
}
