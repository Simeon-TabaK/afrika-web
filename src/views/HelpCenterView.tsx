import { useState } from 'react';
import { 
  HelpCircle, 
  Shield, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Search
} from 'lucide-react';

export const HelpCenterView = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'privacy' | 'terms'>('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: "Comment fonctionne la conversion multi-devises sur Afri-ka ?",
      a: "Toutes les transactions sont enregistrées dans la devise d'origine choisie par le donateur (USD, EUR, CDF, XAF, XOF, RWF, KES, NGN) et converties au cours du jour dans notre devise de consolidation (USD). Nos taux de change sont rafraîchis en continu."
    },
    {
      q: "Qu'est-ce que le statut 'Membre Certifié' et quels sont ses avantages ?",
      a: "La certification atteste de l'identité vérifiée d'un porteur d'initiative ou donateur. Elle octroie un badge officiel visible sur votre profil, renforce la confiance lors des levées de fonds et autorise la publication d'offres dans les sous-groupes communautaires."
    },
    {
      q: "Quels moyens de paiement sont pris en charge ?",
      a: "Nous prenons en charge les cartes bancaires internationales (Visa, Mastercard via Stripe), PayPal, ainsi que les réseaux Mobile Money en Afrique (M-Pesa, Orange Money, Airtel Money, MTN, Wave via notre partenaire PawaPay)."
    },
    {
      q: "Pourquoi le sous-groupe 'Produits & Services' n'apparaît-il pas toujours ?",
      a: "Par souci de pertinence et de clarté dans l'espace communautaire, le sous-groupe Produits & Services est dynamiquement masqué s'il ne contient aucun article actif."
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff' }}>
          Centre d'Aide & Cadre Juridique
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
          Foire aux questions, engagements de confidentialité et conditions d'utilisation de la plateforme Afri-ka.
        </p>

        {/* Tab switcher */}
        <div style={{
          display: 'inline-flex',
          gap: '8px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          marginTop: '20px'
        }}>
          <button
            className={`btn ${activeTab === 'faq' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-full)', border: 'none' }}
            onClick={() => setActiveTab('faq')}
          >
            <HelpCircle size={14} />
            <span>Foire aux Questions</span>
          </button>
          <button
            className={`btn ${activeTab === 'privacy' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-full)', border: 'none' }}
            onClick={() => setActiveTab('privacy')}
          >
            <Shield size={14} />
            <span>Politique de Confidentialité</span>
          </button>
          <button
            className={`btn ${activeTab === 'terms' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-full)', border: 'none' }}
            onClick={() => setActiveTab('terms')}
          >
            <FileText size={14} />
            <span>Conditions d'Utilisation</span>
          </button>
        </div>
      </div>

      {activeTab === 'faq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            <input
              type="text"
              placeholder="Rechercher une question ou un terme..."
              className="select-input"
              style={{ width: '100%', paddingLeft: '40px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Accordion FAQ Items */}
          {filteredFaqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div 
                key={index} 
                className="card" 
                style={{ padding: '20px', cursor: 'pointer' }}
                onClick={() => setExpandedFaq(isExpanded ? null : index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{faq.q}</h4>
                  {isExpanded ? <ChevronUp size={18} color="#6B9E41" /> : <ChevronDown size={18} color="#888" />}
                </div>
                {isExpanded && (
                  <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="card" style={{ padding: '32px', lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '14px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Politique de Protection des Données Personnelles
          </h2>
          <p style={{ marginBottom: '14px' }}>
            La plateforme <strong>Afri-ka</strong> s'engage à respecter la vie privée et à protéger l'intégrité des informations de ses utilisateurs, conformément aux réglementations de protection des données (notamment le RGPD et les lois nationales africaines sur la protection des données numériques).
          </p>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '20px', marginBottom: '8px' }}>
            1. Collecte et Utilisation des Données KYC
          </h3>
          <p style={{ marginBottom: '14px' }}>
            Les pièces d'identité soumises dans le cadre de la certification sont chiffrées au repos et exclusivement utilisées par nos agents de conformité pour vérifier votre identité légale. Elles ne sont en aucun cas commercialisées ou partagées à des fins publicitaires.
          </p>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '20px', marginBottom: '8px' }}>
            2. Sécurité des Transactions Financières
          </h3>
          <p>
            Afri-ka ne conserve aucun numéro complet de carte bancaire ni de code secret Mobile Money. Toutes les opérations de paiement transitent par nos prestataires certifiés PCI-DSS (Stripe, PayPal, PawaPay).
          </p>
        </div>
      )}

      {activeTab === 'terms' && (
        <div className="card" style={{ padding: '32px', lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '14px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Conditions Générales d'Utilisation (CGU)
          </h2>
          <p style={{ marginBottom: '14px' }}>
            Bienvenue sur Afri-ka. L'accès et l'utilisation de nos services (dons, participation aux communautés, certification) impliquent l'acceptation pleine et entière des présentes conditions.
          </p>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '20px', marginBottom: '8px' }}>
            1. Engagements des Membres
          </h3>
          <p style={{ marginBottom: '14px' }}>
            Chaque membre s'engage à fournir des informations exactes lors de ses démarches et à respecter la courtoisie dans les espaces de discussion communautaires. Tout abus ou tentative de fraude entraîne la révocation immédiate du compte.
          </p>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '20px', marginBottom: '8px' }}>
            2. Frais de Certification & Dons
          </h3>
          <p>
            Les frais de certification (10 USD ou leur contre-valeur en devises locales) couvrent les coûts de traitement administratif et technique des dossiers de vérification. Les dons versés aux projets solidaires sont irrévocables une fois validés par les passerelles bancaires.
          </p>
        </div>
      )}
    </div>
  );
};
