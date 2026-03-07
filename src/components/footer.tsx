

export default function Footer(){
    return(
        <footer style={{ background: '#101622', color: '#fff', padding: '64px 40px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                {/* <div style={{ width: 32, height: 32, background: '#f2b90d', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1c180d', fontWeight: 900, fontSize: 11 }}>TNI</div> */}
                <span style={{ fontSize: 20, fontWeight: 700 }}>TNI Group</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7 }}>Spécialiste du transport international et du dédouanement entre le Royaume du Maroc et l'Union Européenne.</p>
            </div>
            {[
              { title: 'Services', links: ['Transport Standard', 'Transport Frigorifique', 'Gestion Douanière', 'Conseil Logistique'] },
              { title: 'Liens Utiles', links: ['À Propos', 'FAQ', 'Mentions Légales', 'Contact'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 style={{ fontWeight: 700, marginBottom: 24 }}>{title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {links.map(l => <li key={l}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 14 }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 24 }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: 'location_on', text: 'Casablanca & Tanger, Maroc' },
                  { icon: 'mail', text: 'contact@tnigroup.ma' },
                  { icon: 'call', text: '+212 5XX XX XX XX' },
                ].map(({ icon, text }) => (
                  <p key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#9ca3af', margin: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#f2b90d' }}>{icon}</span> {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>© 2026 TNI Group. Tous droits réservés.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['LinkedIn', 'Instagram'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
}