export function createBase64Image(fileObj) {
    const reader = new FileReader();
    reader.onload = (event) => {
        this.base64 = event.target.result;
    }
    reader.readAsDataURL(fileObj);
}
