export async function downloadFile(url: string, fileName: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}
