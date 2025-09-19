import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-50">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Impressum | feschunterwegs</title>
      </Helmet>
      <div className="container-editorial py-16">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-editorial-600 hover:text-editorial-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück zur Startseite
          </button>
          <h1 className="text-4xl font-light text-editorial-900 mb-4">Impressum</h1>
          <div className="text-sm text-editorial-600">
            <p>Angaben gemäß § 5 TMG</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 1 Angaben gemäß § 5 TMG</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>Studio 177 GmbH</strong></p>
              <p>Baaderstraße 25 RGB</p>
              <p>80469 München</p>
              <p>Deutschland</p>
              <br/>
              <p><strong>Vertreten durch:</strong></p>
              <p>Alessa Schuhmacher (Geschäftsführerin)</p>
              <br/>
              <p><strong>Kontakt:</strong></p>
              <p>E-Mail: servus@feschunterwegs.com</p>
              <br/>
              <p><strong>Registereintrag:</strong></p>
              <p>Eintragung im Handelsregister</p>
              <p>Registergericht: Amtsgericht München</p>
              <p>Registernummer: 284198</p>
              <br/>
              <p><strong>Umsatzsteuer-ID:</strong></p>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p>DE361238214</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 2 Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Alessa Schuhmacher</p>
              <p>Studio 177 GmbH</p>
              <p>Baaderstraße 25 RGB</p>
              <p>80469 München</p>
              <p>Deutschland</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 3 Streitschlichtung</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-editorial-600 hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
              <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
              <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 4 Haftung für Inhalte</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
              <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 5 Haftung für Links</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
              <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 6 Urheberrecht</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
              <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 7 Datenschutz</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.</p>
              <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
              <p>Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.</p>
              <p>Ausführliche Informationen zum Datenschutz finden Sie in unserer <Link to="/datenschutz" className="text-editorial-600 hover:underline">Datenschutzerklärung</Link>.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">§ 8 Kontakt</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Bei Fragen zu diesem Impressum wenden Sie sich bitte an:</p>
              <p>E-Mail: support@feschunterwegs.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
