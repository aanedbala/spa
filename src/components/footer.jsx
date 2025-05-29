function Footer() {
    return <footer className="page-footer
    pink lighten-2">
        <div className="footer-copyright ">
            <div className="container">
                <span>© {new Date().getFullYear()} Nedbala A.A.</span>
                <a className="grey-text
                text-lighten-4 right" 
                href="https://github.com/aanedbala/spa">Repository</a>
            </div>
        </div>
    </footer>
}
export { Footer };