const Footer = () => {
    return (
        <footer className="bg-white py-10 border-t mt-16">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
                <div>
                    <h3 className="font-bold mb-2">SketchPrompt</h3>
                    <p>Daily inspiration for urban sketchers and artists</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-1">
                        <li>About</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Connect</h4>
                    <div className="flex gap-4">
                        <span>🐦</span>
                        <span>📸</span>
                        <span>💬</span>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-400 mt-8">
                © 2026 SketchPrompt. All rights reserved.
            </div>
        </footer>
    )
}