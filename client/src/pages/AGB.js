import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AGB = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-50">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>AGB | feschunterwegs</title>
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
          <h1 className="text-4xl font-light text-editorial-900 mb-4">Allgemeine Geschäftsbedingungen</h1>
          <div className="text-sm text-editorial-600">
            <p><strong>Studio 177 GmbH</strong> (Betreiber der Marke feschunterwegs)</p>
            <p>Baaderstraße 25 RGB, 80469 München</p>
            <p>Vertreten durch: Alessa Schuhmacher (Geschäftsführerin)</p>
            <p>E-Mail: servus@feschunterwegs.com</p>
            <br/>
            <p>Stand: 19. Juli 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">1. Wer wir sind und wofür diese AGB gelten</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>1.1</strong> Diese AGB gelten für alle Buchungen von Reisen, Ausflügen und sonstigen touristischen Leistungen, die über feschunterwegs vermittelt werden.</p>
              <p><strong>1.2</strong> Wir sind Vermittler, nicht Reiseveranstalter. Verträge über die Durchführung der Reiseleistungen kommen ausschließlich zwischen euch und dem jeweiligen Anbieter (Leistungsträger) zustande. Wir selbst bieten keine Pauschalreisen im Sinne des § 651a BGB an.</p>
              <p><strong>1.3</strong> Abweichende Geschäftsbedingungen unserer Kunden gelten nur, wenn wir ausdrücklich schriftlich zustimmen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">2. Was wir vermitteln – und was nicht</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>2.1</strong> Wir vermitteln touristische Leistungen wie Unterkünfte, Aktivitäten, Führungen, Transfers oder Kurztrips in der Region München und Umgebung. Flugreisen bieten wir nicht an.</p>
              <p><strong>2.2</strong> Die Erbringung der vermittelten Leistungen liegt allein in der Verantwortung der jeweiligen Anbieter.</p>
              <p><strong>2.3</strong> Wir selbst haften ausschließlich für die sorgfältige Vermittlung. Veranstalterpflichten übernehmen wir nicht.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">3. Buchung & Vertragsabschluss</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>3.1</strong> Mit der Buchung gebt ihr uns den Auftrag, eine bestimmte Reiseleistung zu vermitteln.</p>
              <p><strong>3.2</strong> Wir bestätigen euch den Eingang der Buchung per E-Mail. Verbindlich wird die Buchung erst mit Bestätigung des jeweiligen Leistungsträgers.</p>
              <p><strong>3.3</strong> Es gelten sowohl diese AGB als auch die Vertragsbedingungen des jeweiligen Leistungsträgers, die euch vor oder spätestens mit Vertragsabschluss zugänglich gemacht werden.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">4. Preise & Zahlung</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>4.1</strong> Alle Preise sind in Euro angegeben und enthalten die gesetzliche Mehrwertsteuer.</p>
              <p><strong>4.2</strong> Unser Vermittlungshonorar ist im Gesamtpreis enthalten. Eventuelle zusätzliche Servicegebühren weisen wir transparent vor Buchung aus.</p>
              <p><strong>4.3</strong> Zahlungen erfolgen je nach Anbieter entweder direkt an diesen oder über ein von uns eingesetztes Treuhand-/Split-Payment-System.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">5. Rücktritt, Umbuchung & Stornierung</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>5.1</strong> Rücktritt, Umbuchung oder Stornierung richten sich nach den Bedingungen des jeweiligen Anbieters.</p>
              <p><strong>5.2</strong> Auf Wunsch leiten wir entsprechende Mitteilungen an den Anbieter weiter.</p>
              <p><strong>5.3</strong> Etwaige Bearbeitungsgebühren geben wir euch vorab klar bekannt.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">6. Nachhaltigkeit als Prinzip</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>6.1</strong> Unsere Vermittlungen setzen auf Reisen, die mit Zug oder Auto erreichbar sind.</p>
              <p><strong>6.2</strong> Damit spart ihr im Vergleich zu Flugreisen deutlich CO₂.</p>
              <p><strong>6.3</strong> Dieses Prinzip ist Teil unserer Philosophie und kein Vertragsbestandteil.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">7. Wenn etwas schiefläuft</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>7.1</strong> Mängel oder Probleme bei den gebuchten Leistungen müsst ihr direkt beim Anbieter anzeigen.</p>
              <p><strong>7.2</strong> Gerne könnt ihr euch auch an uns wenden – wir leiten euer Anliegen dann weiter.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">8. Unsere Haftung</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>8.1</strong> Wir haften nur für die ordnungsgemäße Vermittlung der Leistungen.</p>
              <p><strong>8.2</strong> Für Leistungsstörungen oder Schäden bei den Anbietern übernehmen wir keine Haftung – außer, wenn wir vorsätzlich oder grob fahrlässig falsch vermittelt haben.</p>
              <p><strong>8.3</strong> Für Informationen (z. B. Leistungsbeschreibungen, Verfügbarkeiten), die uns von Anbietern übermittelt wurden, haften wir nicht, sofern sie für uns bei üblicher Sorgfalt nicht erkennbar falsch waren.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">9. Datenschutz</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>9.1</strong> Wir nutzen eure personenbezogenen Daten ausschließlich zur Abwicklung eurer Buchung.</p>
              <p><strong>9.2</strong> Eine Weitergabe erfolgt nur an die beteiligten Anbieter, Zahlungsdienstleister oder Versicherungen, soweit dies für die Durchführung erforderlich ist.</p>
              <p><strong>9.3</strong> Eure Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit bleiben unberührt.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">10. Versicherungen</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>10.1</strong> Wir empfehlen euch, passende Reiseversicherungen abzuschließen, insbesondere:</p>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Reiserücktrittskostenversicherung</li>
                <li>Reisegepäckversicherung</li>
                <li>Auslandskrankenversicherung</li>
              </ul>
              <p><strong>10.2</strong> Der Abschluss liegt in eurer eigenen Verantwortung.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">11. Streitbeilegung</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>11.1</strong> Wir nehmen nicht an Schlichtungsverfahren vor Verbraucherschlichtungsstellen teil und sind dazu auch nicht verpflichtet.</p>
              <p><strong>11.2</strong> Ihr könnt euch jedoch freiwillig an die Allgemeine Verbraucherschlichtungsstelle wenden:</p>
              <p className="ml-6">Zentrum für Schlichtung e.V., Straßburger Str. 8, 77694 Kehl<br/>
              E-Mail: mail@verbraucher-schlichter.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">12. Besondere Hinweise zu verbundenen Reiseleistungen</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Wenn ihr über uns innerhalb von 24 Stunden mindestens zwei verschiedene Reiseleistungen für dieselbe Reise bucht, handelt es sich um sogenannte verbundene Reiseleistungen (§ 651w BGB). In diesem Fall erhaltet ihr von uns zusätzlich das gesetzlich vorgeschriebene Formblatt nach Art. 251 EGBGB rechtzeitig vor Vertragsabschluss.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">13. Kurz & knapp</h2>
            <div className="space-y-4 text-editorial-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Wir sind Vermittler, nicht Veranstalter.</li>
                <li>Eure Verträge bestehen mit den jeweiligen Anbietern.</li>
                <li>Wir sorgen für eine faire, transparente und nachhaltige Vermittlung.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AGB;
