import { toast } from "react-toastify";



export function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
        toast.error('Clipboard API not supported')
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        toast.success('Copying to clipboard was successful!');
    }, function (err) {
        toast.error('Could not copy text: ', err);
    });
}
