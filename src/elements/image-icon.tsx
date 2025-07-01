/**
 * 
 * @param {string} path - image path based on public folder
 * @param {string} alt - alternate text
 * @returns formatted image
 */
// const ImageIcon = ({ path, alt = "image" }: { path: string, alt: string | undefined }) => {
const ImageIcon = ({ path, alt = "image" }: { path: string, alt?: string }) => {
    return (
        <img src={path} alt={alt} className="h-6 w-6 m-0 p-0" />
    );
}

export default ImageIcon;