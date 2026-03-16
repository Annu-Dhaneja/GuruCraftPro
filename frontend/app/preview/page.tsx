import fs from 'fs';
import path from 'path';

export default async function PreviewPage() {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'user_provided');
    let files: string[] = [];
    try {
        files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(jpg|jpeg|png|webp|gif)$/i));
    } catch (e) {
        console.error(e);
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Image Preview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {files.map(file => (
                    <div key={file} style={{ border: '1px solid #ccc', padding: 10, textAlign: 'center' }}>
                        <img src={`/images/user_provided/${file}`} alt={file} style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }} />
                        <p style={{ wordBreak: 'break-all', fontSize: '12px' }}>{file}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
