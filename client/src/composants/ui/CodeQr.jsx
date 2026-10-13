import { QRCodeSVG } from 'qrcode.react'

function CodeQr({ valeur, libelle, legende }) {
    return (
        <figure className="code-qr">
            <QRCodeSVG
                value={valeur}
                size={160}
                level="M"
                bgColor="#ffffff"
                fgColor="#16213e"
                marginSize={4}
                role="img"
                aria-label={libelle}
            />
            <figcaption className="code-qr__legende">{legende}</figcaption>
        </figure>
    )
}

export default CodeQr
